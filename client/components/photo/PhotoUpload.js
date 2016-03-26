import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import DropZone from './dropZone';

const PhotoUpload = ({
  currentUser,
  isUploadModalOpen, 
  currentFileUploading,
  isDropOpen,
  error,
  onPhotoDrop,
  onOpenClick,
  onUploadSuccess,
  onUploadFailure,
  onUploadButtonClick,
  closeUploadModal
}) => {
  let info = {}
  let title
  let description
  let tags

  const actions = [
    <FlatButton 
      label='Cancel'
      primary={true}
      onTouchTap={closeUploadModal} />,
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
        }
        onUploadButtonClick(metaData, currentFileUploading);
      }} />
  ];

  return (
    <div>
      <Dialog
        title= { 'Upload Photo' }
        actions = { actions }
        modal={ true }
        open={ isUploadModalOpen }
      >
        <br />
        <TextField ref= { (node) => {info.title = node} } hintText='title'/> 
        <br />
        <TextField ref= { (node) => {info.description = node} } hintText='description'/>
        <br />
        <TextField ref= { (node) => {info.tags = node} } hintText='tags'/>
        { error !== '' ? <p>errorMessage </p>: '' }
        <br />
        <DropZone 
          onPhotoDrop={ onPhotoDrop } 
          currentFileUploading={ currentFileUploading } 
          onOpenClick={ onOpenClick } />
        <br />
        
      </Dialog>

    </div>
  )
}

export default PhotoUpload;
