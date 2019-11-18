import { Contract } from 'ethers'

import { abi } from './hash.json'
import { provider } from './ethers'

export default new Contract(
  '0x174D16C6940Af5d13875045cC35312f8C618AD2F',
  abi,
  provider.getSigner(0)
)
