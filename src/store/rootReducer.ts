import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from 'slices/notification';

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export default rootReducer;
