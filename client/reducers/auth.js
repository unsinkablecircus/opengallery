var initialState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  isFetching: false,
  error: '',
  username: '',
  showSigninAndNotSignup: true
}

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.auth : initialState;


const auth = (state=startingState, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'AUTH_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        error: ''
      })
    case 'AUTH_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: action.payload.message
      })
    case 'LOGOUT':
      // clear the store
      console.log('cleared storage');
      localStorage.clear();
      return Object.assign({}, state, {
        isAuthenticated: false,
        error: ''
      })
    case 'TOGGLE_SIGNIN_OR_SIGNUP_LINK':
      return Object.assign({}, state, {
        showSigninAndNotSignup: !state.showSigninAndNotSignup,
        error: ''
      })

    default:
      return state;
  }
}


export default auth


