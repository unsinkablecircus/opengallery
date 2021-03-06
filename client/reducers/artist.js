import { initialState } from '../../test/initialState';

let startingState = initialState.artist;

var isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode() !== true) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.artist : initialState.artist;
}

const artist = (state = startingState, action) => {
  switch (action.type) {
    case 'UPDATE_ARTIST':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default artist;
