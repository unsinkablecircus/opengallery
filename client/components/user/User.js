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
import Email from 'material-ui/lib/svg-icons/communication/email';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import AddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo';
import Person from 'material-ui/lib/svg-icons/social/person';
import Website from 'material-ui/lib/svg-icons/social/public';
import Colors from 'material-ui/lib/styles/colors';

const User = ({
  userId,
  username,
  editMode,
  switchEditMode
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
              label={editMode ? 'Save Changes' : 'Edit Profile'}
              secondary={true}
              icon={<Edit color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />}
              onTouchTap={switchEditMode}
            />
            <div className="user-row">
              <Person color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue={username}
                className="user-field"
                underlineShow={editMode ? true : false}
              />
            </div>
            <div className="user-row">
              <Email color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue="Disabled Value"
                className="user-field"
                underlineShow={editMode ? true : false}
              />
            </div>
            <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue="Disabled Value"
                className="user-field"
                underlineShow={editMode ? true : false}
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
