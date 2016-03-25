import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field'

import DropZone from './DropZone'


//on click => dispatch action: show photo upload
//action: show photo upload => update state on model component (this?)
// on drop (use drop zone) => dispatch 'isUploading' function (similar to authActions file)
// on http request for photoUpload endpoint, dispatch 'uploaded' action
// 

const PhotoUpload = ({
  currentUser,
  isDropOpen,
  currentFileUploading,
  isUploaded,
  isUploadModalOpen, 
  error,
  onPhotoDrop,
  onOpenClick,
  onUploadSuccess,
  onUploadFailure,
  onUploadCancel,
  onUploadButtonClick,
  closeUploadModal
}) => {
  let info = {}
  let title
  let description

  const actions = [
    <FlatButton 
      label='Cancel'
      onTouchTap={closeUploadModal}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ () => {
        // generate an object with the values from the input forms
        let metaData = {};
        for (let key in info) {
          if ( info[key].getValue() !== "" ) {
            metaData[key] = info[key].getValue();
          }
        }
        onTouchTap(onUploadButtonClick(metaData, currentFileUploading));
      }}/>
  ];

  return (
    <div>
      <Dialog
        title= { 'Upload Photo' }
        actions = { actions }
        modal={ true }
        open={ isUploadModalOpen }
      >
        <DropZone 
          currentUser={ currentUser }
          onUploadCancel={ onUploadCancel }
          onPhotoDrop={ onPhotoDrop } 
          onOpenClick={ onOpenClick } 
          currentFileUploading={ currentFileUploading }/>
        <br />
        <br />
        <TextField ref= { (node) => {info.title = node} } hintText='title'/> 
        <br />
        <TextField ref= { (node) => {info.description = node} } hintText='description'/>
        { error !== '' ? <p>errorMessage </p>: '' }
      </Dialog>

    </div>
  )
}

export default PhotoUpload;
