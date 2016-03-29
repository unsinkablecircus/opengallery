import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MessageFeed from '../../containers/messageFeed.container';
import Grid from '../../containers/grid';
import MessageModal from '../../containers/messageModal.container'


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
  artist,
  selfUsername,
  editMode,
  switchEditMode,
  saveChanges,
<<<<<<< 12ba93ada55687c524608e751d8ba028fe6e0173
  location,
  displayGridAndNotMessageFeed
=======
  displayGridAndNotMessageFeed,
  toggleShowGridAndNotMessageFeed
>>>>>>> Can now toggle between show grid and show message feed in user
}) => {
  let path = window.location.pathname.split('/')[2];
  let isSelf = (path === selfUsername);
  let { id, name, username, email, facebook_url, twitter_url, avatar, media, about, website } = artist;
  let refHolder = {};

  let data = { id: self.id };
  let button;
  if ( isSelf ) {
    button = <FlatButton
                label={editMode ? 'Save Changes' : 'Edit Profile'}
                secondary={true}
                icon={<Edit color={editMode ? Colors.red500 : Colors.blue500} className="user_edit_save_button" />}
                onTouchTap={ () => {
                  const values = {id: id};
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
              <Person color={ editMode ? Colors.red500 : Colors.blue500 } className="user-icon" />
              <TextField
                disabled={true}
                defaultValue={ username }
                className="user-field"
                underlineShow={false}
              />
            </div>
            <div className="user-row">
              <Face color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ name }
                hintText='name'
                className="user-field"
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.name = node}}
              />
            </div>
            <div className="user-row">
              <Email color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ email }
                hintText='email'

                className="user-field"
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.email = node}}
              />
            </div>
            <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ website }
                className="user-field"
                hintText='website'
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.website = node}}
              />
            </div>
            <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ facebook_url }
                className="user-field"
                hintText='facebook_url'
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.facebook_url = node}}
              />
            </div>
            <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ twitter_url }
                className="user-field"
                hintText='twitter_url'
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.twitter_url = node}}
              />
            </div>
             <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ media }
                className="user-field"
                hintText='twitter_url'
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.media = node}}
              />
            </div>
             <div className="user-row">
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
              <TextField
                disabled={isSelf && editMode ? false : true}
                defaultValue={ about }
                className="user-field"
                hintText='twitter_url'
                multiLine = { true }
                underlineShow={isSelf && editMode ? true : false}
                ref={ (node) => {refHolder.about = node}}
              />
            </div>
          </div>
        </section>
        <section className="user-right">
          <span
           style={{color: displayGridAndNotMessageFeed ? 'red' : 'black'}}
           onClick={toggleShowGridAndNotMessageFeed}
          >
           Show Grid
          </span>
          <span 
            style={{color: displayGridAndNotMessageFeed ? 'black' : 'red'}}
            onClick={toggleShowGridAndNotMessageFeed}
          > 
            Show Message Feed 
          </span>
          { displayGridAndNotMessageFeed ? <Grid loc={location.location}/> : <MessageFeed/> }
        </section>
      </div>

      <MessageModal />

    </div>
  )
}

export default User;
