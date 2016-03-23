let initialState = {
  id: null,
  username: null,
  name: null,
  email: null,
  website: null,
  facebook_url: null,
  twitter_url: null,
  editMode: false
};


let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.user : initialState;

const user = (state=startingState, action) => {
  console.log(state);
  switch (action.type) {
    case 'STORE_USER_DATA':
      return Object.assign({}, state, {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        website: action.payload.website,
        facebook_url: action.payload.facebook_url,
        twitter_url: action.payload.twitter_url
      })
    case 'SWITCH_EDIT_MODE':
      return Object.assign({}, state, {
        editMode: !state.editMode
      })
    default:
      return state;
  }
};

export default user;