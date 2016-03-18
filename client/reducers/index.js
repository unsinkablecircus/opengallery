import { combineReducers } from 'redux';
import grid from './grid';

import { routerReducer } from 'react-router-redux';
import auth from './auth';
import modal from './modal';
import user from './user';

// this combines all of the reduces in the reducers directory.
const reducers = combineReducers({
  auth,
  grid,
  modal,
  user,
  routing: routerReducer
})

export default reducers;