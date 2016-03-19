import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import media from './media'
import status from './status'
import view from './view'
import user from './user'

const reducers = combineReducers({
  auth,
  user,
  status,
  view,
  media,
  routing: routerReducer
})

export default reducers;
