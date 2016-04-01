import React from 'react'
import TextField from 'material-ui/lib/text-field';






const CustomTextField = ({
  disabled,
  value,
  hintText,
  children,
  updateField
}) => {
  return (
     <div className="user-row">
              { children }
              <TextField
                disabled={ disabled }
                value={ value }
                hintText={ hintText }
                className="user-field"
                underlineShow={ !disabled }
                onChange = { (event) => {updateField(hintText, event.target.value)} }
                multiLine = { true }
              />
            </div>
  )
}

export default CustomTextField;
