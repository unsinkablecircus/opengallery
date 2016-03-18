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
import Settings from 'material-ui/lib/svg-icons/action/settings';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Phone from 'material-ui/lib/svg-icons/communication/phone';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import AddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo';


import Colors from 'material-ui/lib/styles/colors';

const User = () => {
  return (
    <div id="user-component">
      <Nav/>
      <div className="user-columns-container">
        <section className="user-left">
          <Avatar 
            size={200} 
            src="http://i.giphy.com/6RwY3KrjXVY7m.gif"
            className="user-avatar"
          />
          <br/>
          <List>
            <ListItem>
              Username
            </ListItem>
          </List>
          
          <Settings color={Colors.red500} /> Settings <br/>
          <Email color={Colors.red500} /> Email <br/>
          <Phone color={Colors.red500} /> Phone <br/>
          <Edit color={Colors.red500} /> Edit <br/>
          <AddPhoto color={Colors.red500} /> Upload an Image <br/>

          <TextField
            hintText="Hint Text"
          /><br/>
          <br/>
          <TextField
            hintText="Hint Text"
          />
        </section>
        <section className="user-right">
          <Grid/>
        </section>
      </div>
    </div>
  )
}

export default User;
