
// reducer for loginUser

// const loginReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_REQUEST":
//       return Object.assign({}, state, {
//         isFetching: true,
//         isAuthenticated: true,
//         user: action 
//       })
//     case "LOGIN_SUCCESS":
//     case "LOGIN_FAILURE":
//     case "LOGOUT SUCCESS":




//   }
// }

var initialState = {
  loggedIn: false,
  showSigninModal: false
}

const auth = (state=initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGGEDIN':
    // can't use ...state spread operator. Probably an issue with babel?
      return Object.assign({}, state, {
          loggedIn: !state.loggedIn
      });
    case 'TOGGLE_SIGNIN_MODAL':
      return Object.assign({}, state, {
          showSigninModal: !state.showSigninModal,
      });
    default:
      return state;
  }
}


export default auth
