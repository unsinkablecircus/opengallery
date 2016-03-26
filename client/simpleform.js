import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes'];

class SimpleForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {firstName, lastName, email, sex, favoriteColor, employed, notes},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
            <input type="text" value='hola' placeholder="First Name" {...firstName}/>
        </div>
        <div>
            <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
            <input type="email" placeholder="Email" {...email}/>
        </div>
      </form>
    );
  }
}

let simpleform = reduxForm({
  form: 'simple',
  fields
})(SimpleForm);

export default simpleform