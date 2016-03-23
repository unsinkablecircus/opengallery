import React from 'react';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/lib/flat-button';

const DropZone = ({
  userId, 
  onPhotoDrop,
  isDropOpen,
  currentFileUploading
}) => {
  const actions = [];

  return (
    <div>
      <Dropzone ref="dropzone" onDrop={ onPhotoDrop } >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <FlatButton type="button" onClick={ isDropOpen }>
          Open
      </FlatButton>
      {currentFileUploading ? <div>
      <h2>Uploading {currentFileUploading.length} files...</h2>
      <div>currentFileUploading.map((file) => <img src={currentFileUploading.preview} />)</div>
      </div> : null}
    </div>
  );
}

export default DropZone;
