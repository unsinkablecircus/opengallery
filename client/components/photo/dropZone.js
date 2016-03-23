import React from 'react';
import Dropzone from 'react-dropzone'

const DropZone = ({
  isDropOpen,
  currentFileUploading
}) => {
  const actions = [];

  return (
    <div>
      <Dropzone ref="dropzone" onDrop={ uploadPhoto } >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <button type="button" onClick={ isDropOpen }>
          Open Dropzone
      </button>
      {currentFileUploading ? <div>
      <h2>Uploading {currentFileUploading.length} files...</h2>
      <div>currentFileUploading.map((file) => <img src={currentFileUploading.preview} />)</div>
      </div> : null}
    </div>
  );
}

export default DropZone;
