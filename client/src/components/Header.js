import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

export default () => {
  const style = { marginTop: '20px' }
  return (
    <Header as='h1' icon style={style} textAlign='center'>
      <Icon name='upload' />
        IPFS File upload
      <Header.Subheader>
        Upload files to the &nbsp;
        <a href='https://ipfs.io/' target='-blank'>
          Interplanetary File System
        </a>
         &nbsp;and store corresponding hash on the Ethereum blockchain
      </Header.Subheader>
    </Header>
  )
}
