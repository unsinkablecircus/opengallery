import React from 'react';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/lib/flat-button';

const DropZone = ({
  currentUser, 
  onUploadCancel,
  onPhotoDrop,
  onOpenClick,
  currentFileUploading
}) => {
  // console.log('currentfileuploading in dropzone', currentFileUploading)
  const actions = [
    
  ];

  let photoObject = {};

  return (
    <div>
      <FlatButton label="Open" primary={true} type="button" onTouchTap={ onOpenClick } />
      <FlatButton label="Cancel" primary={true} type="button" onTouchTap={ onUploadCancel } />
      <Dropzone onDrop={ onPhotoDrop } >
        <div>Click inside or drop file to upload.</div>
      </Dropzone>
      { /*currentFileUploading.length ? <div>
      <h2>Uploading {currentFileUploading.length} file...</h2>
      <div>
      {
        currentFileUploading.map((file, index) => <img key={index} src={file.preview} />)
      }
      </div>
      </div> : null */}
    </div>
  );
}

export default DropZone;
