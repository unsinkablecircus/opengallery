import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Nav from '../nav/Nav';
import Grid from '../grid/Grid'

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  left: {
    width: 290,
    height: '100vh',
    overflowY: 'auto',
    paddingTop: 68,
    float: 'left',
    padding: '5 15'
  },
  right: {
    width: 400,
    height: '100vh',
    overflowY: 'auto',
    paddingTop: 68,
    float: 'left',
    padding: '5 15'
  },
  profile: {
    
  },
}

const User = () => {
  return (
    <div>
      <Nav/>
      <div class="columns-container">
        <section style={styles.left}>
          <List>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar size={150} src="http://i.giphy.com/6RwY3KrjXVY7m.gif" />
              }
            >
            </ListItem>
            <ListItem>
              Username
            </ListItem>
          </List>
          <TextField
            hintText="Hint Text"
          /><br/>
          <br/>
          <TextField
            hintText="The hint text can be as long as you want, it will wrap."
          /><br/>
        </section>
        <section style={styles.right}>
          <Grid />
        </section>
      </div>
    </div>
  )
}

export default User;
