// reducer for the modal attribute

var initialState = {
  signIn: false,
  signUp: false,
  uploadTile: false,
  gallery: false,
  map: false
}

const modal = (state=initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIGNIN_MODAL':
      return Object.assign({}, state, {
          signIn: !state.signIn
      });
    default:
      return state;
  }
}


export default modal;