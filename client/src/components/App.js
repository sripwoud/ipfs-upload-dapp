import React, { Component } from 'react'
import {
  Form,
  Button,
  Icon,
  Input,
  Message
 } from 'semantic-ui-react'

 import { ethers } from 'ethers'

import ipfs from '../ipfs'
import contract from '../ethereum/hash'
import Layout from './Layout'

class App extends Component {
  state = {
    buffer: '',
    txHash: '',
    errorMessage: '',
    loading: false,
    ipfsHash: ''
  }

  async componentDidMount () {
    const ipfsHash = await contract.ipfsHash()
    this.setState({ ipfsHash })
    console.log(this.state)
  }

  //Take file input from user
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  }

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result)
    //set this buffer-using es6 syntax
    this.setState({ buffer })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    try {
      //save document to IPFS,return its hash, and set hash to state
      const results = await ipfs.add(this.state.buffer)
      console.log(results[0])
      this.setState({ ipfsHash: results[0].hash })
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
    this.setState({ loading: false, })

    // call Ethereum contract method "sendHash" and .send IPFS hash to ethereum contract
    //set transaction hash to state
    const txHash = await contract.setHash(this.state.ipfsHash)
    this.setState({ txHash })
  }

  renderMessage() {
    if (this.state.loading) {
      return (
        <Message icon>
          <Icon
            name='circle notched'
            loading
          />
          <Message.Content>
            <Message.Header>Status</Message.Header>
          </Message.Content>
        </Message>
      )
    } else {
      return (
        <Message>
          <Message.Content>
            <Message.Header>Status</Message.Header>
            Last IPFS hash stored onchain:&nbsp;
            <a href={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}>
              {this.state.ipfsHash}
            </a>
          </Message.Content>
        </Message>
      )
    }
  }

  render () {
    return (
      <Layout>
        <Form
          error={!!this.state.errorMessage}
          onSubmit={this.onSubmit}
        >
          <Form.Field>
            <label>Choose file to send to IPFS</label>
            <Input
              type='file'
              onChange={this.captureFile}
            />
          </Form.Field>
          <Message
            error
            header='Oops'
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.loading}>
            Send it!
          </Button>
        </Form>
        <br/>
        {this.renderMessage()}
      </Layout>
    )
  }
}

export default App
