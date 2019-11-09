import web3 from './web3'

import Hash from './hash.json'

export default new web3.eth.Contract(
  Hash.abi,
  '0x2652162Fa9A6A6CFA38b86a8b4A310990b1F65B0'
)
