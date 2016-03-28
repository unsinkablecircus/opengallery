import { combineReducers } from 'redux'
import auth from './auth'
// import grid from './grid';
import media from './media'
import status from './status'
import view from './view'
import user from './user'
import artist from './artist'
import { routerReducer } from 'react-router-redux'


const reducers = combineReducers({
  auth,
  user,
  artist,
  status,
  view,
  media,
  routing: routerReducer
})

export default reducers;
