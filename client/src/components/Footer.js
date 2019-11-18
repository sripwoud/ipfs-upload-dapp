import React from 'react'
import { Segment, Divider, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <div>
      <p>
        Ethereum Contract:&nbsp;
        <a href='https://rinkeby.etherscan.io/address/0x174D16C6940Af5d13875045cC35312f8C618AD2F'>
          0x174D16C6940Af5d13875045cC35312f8C618AD2F
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
