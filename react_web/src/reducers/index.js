import {combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

import messageReducer from './messageReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,

  message:messageReducer
});
