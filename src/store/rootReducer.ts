import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from '@/slices/notification';
import userReducer from '@/slices/user';
import authReducer from '@/slices/auth';

const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
