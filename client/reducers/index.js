import { combineReducers } from 'redux'
import auth from './auth'
// import grid from './grid';
import media from './media'
import status from './status'
import view from './view'
import user from './user'
import artist from './artist'
import messageFeed from './messageFeed.reducer'
import form from './form'
import nav from './nav.reducer'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  form,
  messageFeed,
  auth,
  user,
  artist,
  status,
  view,
  media,
  nav,
  routing: routerReducer
})

export default reducers;
