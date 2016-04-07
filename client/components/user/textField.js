import React from 'react'
import TextField from 'material-ui/lib/text-field';






const CustomTextField = ({
  disabled,
  value,
  hintText,
  children,
  updateField
}) => {

  const field = hintText;
  if ( value === 'null' ) value = "";
  hintText = (value === null || value === '') ? ('no ' + hintText) : null;
  return (
     <div className="user-row">
              { children }
              <TextField
                disabled={ disabled }
                value={ value }
                hintText={ hintText }
                className="user-field"
                underlineShow={ !disabled }
                onChange = { (event) => {updateField(field, event.target.value)} }
                multiLine = { true }
              />
            </div>
  )
}

export default CustomTextField;
