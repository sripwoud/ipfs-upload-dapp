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

    //save document to IPFS,return its hash, and set hash to state
    const ipfsHash = await ipfs.add(this.state.buffer)
    this.setState({ ipfsHash: ipfsHash[0].hash })

    // call Ethereum contract method "sendHash" and .send IPFS hash to ethereum contract
    //set transaction hash to state
    const text = ethers.utils.formatBytes32String(this.state.ipfsHash)
    const txHash = await contract.setHash(text)
    this.setState({ txHash })
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
        <p>Last IPFS hash stored onchain: {this.state.ipfsHash}</p>
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Status</Message.Header>
            <Message.List>
              <Message.Item>Last transaction hash: {this.state.txHash}</Message.Item>
            </Message.List>
          </Message.Content>
      </Message>
      </Layout>
    )
  }
}

export default App
