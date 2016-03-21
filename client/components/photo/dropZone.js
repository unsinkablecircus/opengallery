import React from 'react';
import dropZone from 'react-dropzone'

const DropZone = ({
  /*states*/
}) => {
  const actions = [];

  return (
    <div>
      <Dropzone ref="dropzone" onDrop={this.onDrop} >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <button type="button" onClick={this.onOpenClick}>
          Open Dropzone
      </button>
      {this.state.files ? <div>
      <h2>Uploading {files.length} files...</h2>
      <div>this.state.files.map((file) => <img src={file.preview} />)</div>
      </div> : null}
    </div>
  );
}

export default DropZone;
