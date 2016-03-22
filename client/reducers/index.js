import { combineReducers } from 'redux';

import auth from './auth'
// import grid from './grid';
import media from './media'
import status from './status'
import view from './view'
import user from './user'
import { routerReducer } from 'react-router-redux';



const routeFix = () => {
  // rehydrate state here

  // return routerReducer here passing


}



const reducers = combineReducers({
  auth,
  // grid,
  user,
  status,
  view,
  media,
  routing: routerReducer
})

export default reducers;
