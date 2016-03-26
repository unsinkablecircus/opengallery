import React from 'react';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/lib/flat-button';

const DropZone = ({
  currentFileUploading,
  onPhotoDrop,
  onOpenClick
}) => {
  // console.log('currentfileuploading in dropzone', currentFileUploading)

  return (
    <div className="drop-zone-box">
      
      { currentFileUploading ? <div>
      <div>
      {
        currentFileUploading.map((file, index) => <img key={index} src={file.preview}  />)
      }
      </div>
      </div> : <Dropzone onDrop={ onPhotoDrop } >
        <div>Click inside or drop file to upload.</div>
      </Dropzone> }
    </div>
  );
}

export default DropZone;
