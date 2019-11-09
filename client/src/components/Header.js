import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

export default () => {
  const style = { marginTop: '20px' }
  return (
    <Header as='h1' icon style={style}>
      <Icon name='upload' />
        IPFS File upload
      <Header.Subheader>
        Upload file to Interplanetary File System and store corresponding hash on the Ethereum blockchain
      </Header.Subheader>
    </Header>
  )
}
