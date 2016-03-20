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
  id,
  username,
  email,
  website,
  editMode,
  switchEditMode,
  saveChanges
}) => {
  let data = {
    id: id,
    username: username,
    email: email,
    website: website
  };

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
              onTouchTap={editMode ? saveChanges.bind(null, data) : switchEditMode}
            />
            <div className="user-row">
              <Person color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue={username}
                className="user-field"
                underlineShow={editMode ? true : false}
                onChange={(event) => { data.username = event.target.value }}
              />
            </div>
            <div className="user-row">
              <Email color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue={email ? email : ''}
                hintText={email ? '' : 'No Email Listed'}
                className="user-field"
                underlineShow={editMode ? true : false}
                onChange={(event) => { data.email = event.target.value }}
              />
            </div>
            <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={editMode ? false : true}
                defaultValue={website ? website : ''}
                hintText={website ? '' : 'No Website Listed'}
                className="user-field"
                underlineShow={editMode ? true : false}
                onChange={(event) => { data.website = event.target.value }}
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
