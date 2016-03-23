import React from 'react';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/lib/flat-button';

const DropZone = ({
  userId, 
  onPhotoDrop,
  isDropOpen,
  currentFileUploading
}) => {
  const actions = [
    
    
  ];

  console.log('inside dropzone and the currentFileUploading is: ', currentFileUploading);
  return (
    <div actions={ actions }>
    {
      //how to pass in current user?
    }
      <Dropzone ref="dropzone" onDrop={ onPhotoDrop } >
        <div>Click inside or drop file to upload.</div>
      </Dropzone>
      <FlatButton label="Open" primary={true} type="button" onClick={ isDropOpen }>
        Open
      </FlatButton>
      {currentFileUploading ? <div>
      <h2>Uploading {currentFileUploading.length} file...</h2>
      <div>
      {
        currentFileUploading.map((file, index) => <img key={index} src={file.preview} />)
      }
      </div>
      </div> : null}
    </div>
  );
}

export default DropZone;
