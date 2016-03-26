import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
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
import Face from 'material-ui/lib/svg-icons/social/mood';
import Website from 'material-ui/lib/svg-icons/social/public';
import Colors from 'material-ui/lib/styles/colors';

const User = ({
  id,
  username,
  name,
  email,
  website,
  facebook_url,
  twitter_url,
  editMode,
  switchEditMode,
  saveChanges
}) => {


  let data = {
    id
  };
  let path = window.location.pathname.split('/')[2];
  let self = (path === username);

  let refHolder = {};


  let button;
  if (self) {
    button = <FlatButton
                label={editMode ? 'Save Changes' : 'Edit Profile'}
                secondary={true}
                icon={<Edit color={editMode ? Colors.red500 : Colors.blue500} className="user_edit_save_button" />}
                onTouchTap={ () => {
                  const values = {};
                  values.id = id;
                  for ( var key in refHolder ) {
                    values[key] = refHolder[key].getValue();
                  }
                  console.log(values);
                  editMode ? saveChanges(values) : switchEditMode()
                }}
              />
  }

  return (
    <div id="user-component">
      <div className="user-columns-container">
        <section className="user-left">
          <div className="user-details">
            <Avatar 
              size={200} 
              className="user-avatar"
            />

            {button}
            <div className="user-row">
              <Person color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={true}
                defaultValue={self ? username : path}
                className="user-field"
                underlineShow={false}
              />
            </div>
            <div className="user-row">
              <Face color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={self && editMode ? false : true}
                defaultValue={self && name ? name : ''}
                hintText='name'
                className="user-field"
                underlineShow={self && editMode ? true : false}
                ref={ (node) => {refHolder.name = node}}
              />
            </div>
            <div className="user-row">
              <Email color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={self && editMode ? false : true}
                defaultValue={self && email ? email : ''}
                hintText='email'

                className="user-field"
                underlineShow={self && editMode ? true : false}
                ref={ (node) => {refHolder.email = node}}
              />
            </div>
            <div className="user-row">
              <Website color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={self && editMode ? false : true}
                defaultValue={self && website ? website : ''}
                className="user-field"
                hintText='website'
                underlineShow={self && editMode ? true : false}
                ref={ (node) => {refHolder.website = node}}
              />
            </div>
            <div className="user-row">
              <Website color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={self && editMode ? false : true}
                defaultValue={self && facebook_url ? facebook_url : ''}
                className="user-field"
                hintText='facebook_url'
                underlineShow={self && editMode ? true : false}
                ref={ (node) => {refHolder.facebook_url = node}}
              />
            </div>
            <div className="user-row">
              <Website color={self && editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={self && editMode ? false : true}
                defaultValue={self && twitter_url ? twitter_url : ''}
                className="user-field"
                hintText='twitter_url'
                underlineShow={self && editMode ? true : false}
                ref={ (node) => {refHolder.twitter_url = node}}
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
