const initialState = {
  id: null,
  username: null,
  email: null,
  website: null,
  editMode: false
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
      return Object.assign({}, state, {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        website: action.payload.website
      })
    case 'SWITCH_EDIT_MODE':
      return Object.assign({}, state, {
        editMode: !state.editMode
      })
    // case 'SAVE_CHANGES':
    //   return Object.assign({}, state, {
    //     editMode: true
    //   })
    default:
      return state;
  }
};

export default user;

// Warning: setState(...): Cannot update during an existing state transition 
// (such as within `render`). Render methods should be a pure function of props 
// and state