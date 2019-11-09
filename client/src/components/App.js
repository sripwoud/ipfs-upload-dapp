import React, { Component } from 'react'

import contract from '../ethereum/hash'
import Layout from './Layout'

const { methods: { ipfsHash, setHash }} = contract

class App extends Component {
  state = { hash: '' }

  async componentDidMount () {
    const hash = await ipfsHash().call()
    this.state = { hash }
  }

  render () {
    return (
      <Layout>
        <p>{this.state.hash}</p>
      </Layout>
    )
  }
}

export default App
