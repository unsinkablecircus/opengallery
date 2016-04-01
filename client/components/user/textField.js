import React from 'react'
import TextField from 'material-ui/lib/text-field';






const CustomTextField = ({
  disabled,
  value,
  hintText,
  children
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
              />
            </div>
  )
}

export default CustomTextField;
