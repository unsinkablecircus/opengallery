import React from 'react';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/lib/flat-button';

const DropZone = ({
  currentFileUploading,
  onRemoveCurrentPhoto,
  onPhotoDrop,
  onOpenClick
}) => {
  // console.log('currentfileuploading in dropzone', currentFileUploading)
const actions = [
    <FlatButton 
      label='Remove'
      primary={true}
      onTouchTap={ onRemoveCurrentPhoto } />
  ];

  return (
    <div className="drop-zone-box">
      
      { currentFileUploading ? <div>
      {
        currentFileUploading.map((file, index) => <div className="image-preview" style={{ backgroundImage: 'url("' + file.preview +'")' }} key={index} />)
      }
      </div> : <Dropzone onDrop={ onPhotoDrop } >
        <div>Click inside or drop file to upload.</div>
      </Dropzone> }
    </div>
  );
}

export default DropZone;
