import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth'
// import grid from './grid';
import media from './media'
import status from './status'
import view from './view'
import user from './user'
import { routerReducer } from 'react-router-redux';



const reducers = combineReducers({
  auth,
  form: formReducer,
  user,
  status,
  view,
  media,
  routing: routerReducer
})

export default reducers;
