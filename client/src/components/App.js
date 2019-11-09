import React, { Component } from 'react'

import ipfs from '../ipfs'
import web3 from '../ethereum/web3'

import {
  Form,
  Button,
  Icon,
  Input,
  Message
 } from 'semantic-ui-react'

import contract from '../ethereum/hash'
import Layout from './Layout'

const { methods: { ipfsHash, setHash }} = contract

class App extends Component {
  state = {
    hash: null,
    buffer: '',
    address: '',
    txHash: '',
    txReceipt: '',
    errorMessage: '',
    loading: false
  }

  async componentDidMount () {
    const hash = await ipfsHash().call()
    this.state = { hash }
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

  //ES6 async function
  onClick = async () => {
    try{
      this.setState({ blockNumber: "waiting.." });        this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err,txReceipt)
          this.setState({txReceipt})
        })
      } catch (error) {
        console.log(error)
      }
    }

  onSubmit = async (event) => {
    event.preventDefault()

    //bring in user's metamask account address
    const accounts = await web3.eth.getAccounts()
    const address= await contract.options.address
    this.setState({ address })

    //save document to IPFS,return its hash, and set hash to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {        console.log(err,ipfsHash)
    this.setState({ ipfsHash: ipfsHash[0].hash })

    // call Ethereum contract method "sendHash" and .send IPFS hash to ethereum contract
    //set transaction hash to state
    setHash(this.state.ipfsHash).send(
      { from: accounts[0] },
      (error, transactionHash) => {
        console.log(transactionHash)
        this.setState({transactionHash})
      })
    })
  }

  render () {
    const list = [
      'Hash stored',
      'test'
    ]
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
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Upload successful</Message.Header>
            <Message.List>
              <Message.Item>IPFS Hash stored on Ethereum Blockchain:</Message.Item>
              <Message.Item>Transaction hash:</Message.Item>
            </Message.List>
          </Message.Content>
      </Message>
      </Layout>
    )
  }
}

export default App
