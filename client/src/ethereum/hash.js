import { Contract } from 'ethers'

import { abi } from './hash.json'
import { provider } from './ethers'

export default new Contract(
  '0x2652162Fa9A6A6CFA38b86a8b4A310990b1F65B0',
  abi,
  provider.getSigner(0)
)
