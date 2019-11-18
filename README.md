# ipfs-upload-dapp
Uploads file to IPFS and stores corresponding hash on Ethereum

## Architecture
![Diagram](./img/diagram.jpg)
## Getting started
1. Clone or download this repository
2. `npm i`
3. `npm start`
## Resources
Based on this [tutorial](https://www.freecodecamp.org/news/hands-on-get-started-with-infura-and-ipfs-on-ethereum-b63635142af0/)
with the following improvements/changes:
- Write contract using Vyper instead of Solidity
- Write python compilation and deployment scripts
- Add test using pytest
- Use semantic UI for front end styling
- Use ethers.js instead of web3.js

### Tech stack
- [React](https://reactjs.org/)
- [Semantic UI](https://react.semantic-ui.com/)
- [Infura](https://infura.io/): Ethereum|IPFS API & Gateway
- [ethers.js](https://github.com/ethers-io/ethers.js/): Complete Ethereum wallet implementation and utilities in JavaScript
- [Vyper](https://github.com/ethereum/vyper): Pythonic Smart Contract Language for the EVM
- [Remix](https://remix.ethereum.org/): Browser-Only Ethereum IDE and Runtime Environment, for contract compilation and deployment
