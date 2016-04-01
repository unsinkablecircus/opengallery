import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import DropZone from './dropZone';

const Upload = ({
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
    <div
      id="modal-component"
      title= { 'Upload Photo' }
      actions = { actions }
      modal={ true }
      open={ isUploadModalOpen }
      autoScrollBodyContent={ true }
    >
      <div
        className="gallery-close rounded"
        onClick={ closeUploadModal }>
        <div className="gallery-escape">ESC</div>
      </div>
      <div id="upload-component">
        <div className="upload-data-container">
          <h1>upload artwork</h1>
          <input
            className="upload-input"
            type="text"
            ref= { (node) => {info.title = node} }
            placeholder='title'/>
          <input
            className="upload-input"
            type="text"
            ref= { (node) => {info.description = node} }
            placeholder='description'/>
          <input
            className="upload-input"
            type="text"
            ref= { (node) => {info.tags = node} }
            placeholder='media tags'/>
        </div>
        <div className="upload-dropzone-container">
          { error !== '' ? <p>errorMessage </p>: '' }
          { isUploading ? <p>Your image is uploading...Upload another!</p> : '' }
          <DropZone
            onRemoveCurrentPhoto={ onRemoveCurrentPhoto }
            onPhotoDrop={ onPhotoDrop }
            currentFileUploading={ currentFileUploading }
            onOpenClick={ onOpenClick } />
        </div>
        <div className="upload-buttons">
          <button className="upload-button upload-button-remove" onClick={ onRemoveCurrentPhoto }>cancel</button>
          <button className="upload-button upload-button-submit" onClick={ () => {
            let metaData = {}
            metaData.userId = currentUser
            for (let key in info) {
              if ( info[key] !== "" ) {
                metaData[key] = info[key];
              }
              if ( key === 'tags') {
                if (metaData.tags !== undefined){
                  metaData.tags = metaData.tags.split(' ')
                } else {
                  metaData.tags = []
                }
              }
            }
            onUploadButtonClick(metaData, currentFileUploading);
          }}>upload</button>
        </div>
      </div>
    </div>
  )
}

export default Upload;
