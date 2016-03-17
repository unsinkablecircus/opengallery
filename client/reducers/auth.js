
var initialState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  isFetching: false,
  error: '',
  showSigninAndNotSignup: true
}


const auth = (state=initialState, action) => {
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
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case 'TOGGLE_SIGNIN_OR_SIGNUP_LINK':
      return Object.assign({}, state, {
        showSigninAndNotSignup: !state.showSigninAndNotSignup
      })

    default:
      return state;
  }
}


export default auth
