import React from 'react'
import { Segment, Divider, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <div>
      <a href='' />
      <p>
        Ethereum Contract:&nbsp;
        <a href='https://rinkeby.etherscan.io/address/0x2652162fa9a6a6cfa38b86a8b4a310990b1f65b0'>
          0x2652162Fa9A6A6CFA38b86a8b4A310990b1F65B0
        </a>
      </p>
      <Divider horizontal>
        <Segment basic textAlign='center'>
          <p>
    Developed on
            <a href='https://www.ethereum.org'>
              <Icon name='ethereum' />
            </a>
    with {' '}
            <Icon name='like' color='red' padding='10px' />
    by
            <a href='https://github.com/6ry0u'>
    @6ry0u
            </a>
          </p>
          <p>
            <a href='https://github.com/6ry0u/airCrowd'>
              <Icon name='github' size='large' color='black' />
            </a>
          </p>
        </Segment>
      </Divider>
    </div>
  )
}
