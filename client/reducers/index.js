import { combineReducers } from 'redux'
import auth from './auth'
// import grid from './grid';
import media from './media'
import status from './status'
import view from './view'
import user from './user'
import artist from './artist'
import messageFeed from './messageFeed.reducer'
import { routerReducer } from 'react-router-redux'


console.log('msgfeed in index', messageFeed);

const reducers = combineReducers({
  messageFeed,
  auth,
  user,
  artist,
  status,
  view,
  media,
  routing: routerReducer
})

export default reducers;
