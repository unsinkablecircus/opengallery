import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Nav from '../../containers/nav';
import Grid from '../../containers/grid';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Phone from 'material-ui/lib/svg-icons/communication/phone';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import AddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo';
import Person from 'material-ui/lib/svg-icons/social/person';
import Colors from 'material-ui/lib/styles/colors';

const User = ({
  userId,
  username,
  editMode
}) => {
  return (
    <div id="user-component">
      <Nav/>
      <div className="user-columns-container">
        <section className="user-left">
          <div className="user-details">
            <Avatar 
              size={200} 
              src="http://i.giphy.com/6RwY3KrjXVY7m.gif"
              className="user-avatar"
            />
            <FlatButton
              label="Edit Profile"
              linkButton={true}
              href="http://localhost:8000/profile/evanchen"
              secondary={true}
              icon={<Edit color={Colors.red500} className="user-icon" />}
            />
            {userId}
            {username}
            {editMode}
            <div className="user-row">
              <Person color={Colors.red500} className="user-icon" />
              <TextField
                disabled={true}
                defaultValue="Disabled Value"
                className="user-field"
              />
            </div>
            <div className="user-row">
              <Email color={Colors.red500} className="user-icon" />
              <TextField
                disabled={true}
                defaultValue="Disabled Value"
                className="user-field"
              />
            </div>
            <div className="user-row">
              <Phone color={Colors.red500} className="user-icon" />
              <TextField
                disabled={true}
                defaultValue="Disabled Value"
                className="user-field"
              />
            </div>
            <div className="user-row">
              <AddPhoto color={Colors.red500} className="user-icon" />
              <TextField
                disabled={true}
                defaultValue="Disabled Value"
                className="user-field"
              />
            </div>
          </div>
        </section>
        <section className="user-right">
          <Grid/>
        </section>
      </div>
    </div>
  )
}

export default User;
