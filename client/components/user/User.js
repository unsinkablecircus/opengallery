import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import styles from 'material-ui/lib/styles';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const User = () => {
  return (
    <List>
      <ListItem
        disabled={true}
        leftAvatar={
          <Avatar src="http://theme.co/x/demo/icon/1/wp-content/uploads/sites/2/2013/07/3-loupe.png" />
        }
      >
        Image Avatar
      </ListItem>
    </List>
  )
}

export default User;
