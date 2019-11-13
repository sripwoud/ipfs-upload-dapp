import { ethers } from 'ethers'
require('dotenv').config()

let provider
if (window.ethereum) {
  const ethereum = window.ethereum
  ethereum.enable()
  provider = new ethers.providers.Web3Provider(ethereum)
} else {
  alert('You need to install metamask to use this Dapp')
}

export { provider }
