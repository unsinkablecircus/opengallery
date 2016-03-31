import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import DropZone from './dropZone';

const PhotoUpload = ({
  closeUploadModal,
  currentFileUploading,
  currentUser,
  error,
  isDropOpen,
  isUploadModalOpen,
  isUploading,
  onPhotoDrop,
  onOpenClick,
  onRemoveCurrentPhoto,
  onUploadSuccess,
  onUploadFailure,
  onUploadButtonClick
}) => {
  let info = {}
  let title
  let description
  let tags

  const actions = [
    <FlatButton 
      label='Remove'
      primary={true}
      onTouchTap={ onRemoveCurrentPhoto } />,
    <FlatButton 
      label='Close'
      primary={true}
      onTouchTap={ closeUploadModal } />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ () => {
        let metaData = {};
        metaData.userId = currentUser;
        for (let key in info) {
          if ( info[key].getValue() !== "" ) {
            metaData[key] = info[key].getValue();
          }
          if ( key === 'tags') {
            if (metaData.tags !== undefined){
              metaData.tags = metaData.tags.split(' ');
            } else {
              metaData.tags = [];
            }
          }
        }
        onUploadButtonClick(metaData, currentFileUploading);
      }} />
  ];

  return (
    <Dialog
          title= { 'Upload Photo' }
          actions = { actions }
          modal={ true }
          open={ isUploadModalOpen }
          autoScrollBodyContent={ true }
        >
      <div className="photo-upload-container">
        <div className="photo-data-container">
          <br />
          <TextField ref= { (node) => {info.title = node} } hintText='title' fullWidth={true}/> 
          <br />
          <TextField ref= { (node) => {info.description = node} } hintText='description' fullWidth={true}/>
          <br />
          <TextField ref= { (node) => {info.tags = node} } hintText='media tags' fullWidth={true}/>
        </div>
        <br />
        <div className="drop-zone-container">
          { error !== '' ? <p>errorMessage </p>: '' }
          { isUploading ? <p>Your image is uploading...Upload another!</p> : '' }
          <DropZone 
            onRemoveCurrentPhoto={ onRemoveCurrentPhoto }
            onPhotoDrop={ onPhotoDrop } 
            currentFileUploading={ currentFileUploading } 
            onOpenClick={ onOpenClick } />
        </div>
        <br />
      </div>
    </Dialog>
  )
}

export default PhotoUpload;
