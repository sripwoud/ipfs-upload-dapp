import React, { Component } from 'react'

import contract from '../ethereum/hash'

const { methods: { ipfsHash, setHash }} = contract

class App extends Component {
  state = { hash: '' }
  
  async componentDidMount () {
    const hash = await ipfsHash().call()
    this.state = { hash }
  }
  
  render () {
    return (
      <div>
        <h1>App</h1>
        <p>{this.state.hash}</p>
      </div>
    )
  }
}

export default App