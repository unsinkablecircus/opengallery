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

const User = () => {
  return (
    <div id="user-component">
      <Nav/>
      <div className="user-columns-container">
        <section className="user-left">
          <Avatar size={200} src="http://i.giphy.com/6RwY3KrjXVY7m.gif" />
          <List>
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
          HELLOHELLOHELLO
        </section>
        <section className="user-right">
          <Grid/>
        </section>
      </div>
    </div>
  )
}

export default User;
