import React from 'react';

// Material UI icons
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import AddPhoto from 'material-ui/lib/svg-icons/image/add-a-photo';
import Person from 'material-ui/lib/svg-icons/social/person';
import Face from 'material-ui/lib/svg-icons/social/mood';
import Website from 'material-ui/lib/svg-icons/social/public';
import Colors from 'material-ui/lib/styles/colors';

import TextField from './textField'
import MessageFeed from '../../containers/messageFeed.container';
import Grid from '../../containers/grid';
import MessageModal from '../../containers/messageModal.container'


const User = ({
  artist,
  selfUsername,
  self_id,
  editMode,
  switchEditMode,
  saveChanges,
  location,
  fetchConversation,
  formData,
  updateField,
  toggleMessageModal
}) => {

  // Check if the user is on his/her own page
  let path = window.location.pathname.split('/')[2];
  let isSelf = (path === selfUsername);

  let { name, username, email, website, facebook, twitter, about, media } = formData;



  const button1 = 
    <FlatButton
    label={editMode ? 'Save Changes' : 'Edit Profile'}
    secondary={true}
    icon={<Edit color={editMode ? Colors.red500 : Colors.blue500} className="user_edit_save_button" />}
    onTouchTap={ () => {
      let data = Object.assign({}, formData, {id: self_id})
      editMode ? saveChanges(data) : switchEditMode()                
    }}
  />

  const button2 =
   <FlatButton
    label='Send Message'
    secondary={true}
    onTouchTap= { () => {
      fetchConversation(self_id, artist.id, artist.username);
      toggleMessageModal();
    }}
  />


  return (
    <div id="user-component">
      <div className="user-columns-container">
        <section className="user-left">
          <div className="user-details">
            <Avatar 
              size={200} 
              className="user-avatar"
            />
            { isSelf ? button1 : button2 }
            <MessageModal />

            <TextField disabled={ true } hintText='username' value={username}>
              <Person color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='name' value={name}>
              <Face color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='email' value={email}>
              <Email color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='website' value={website}>
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='facebook' value={facebook}>
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='twitter' value={twitter}>
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='media' value={media}>
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

            <TextField disabled={!editMode} hintText='about' value={about}>
              <Website color={editMode ? Colors.red500 : Colors.blue500} className="user-icon" />
            </TextField>

          </div>
        </section>
        <section className="user-right">
          <Grid loc={location.location}/>
        </section>
      </div>


    </div>
  )
}

export default User;
