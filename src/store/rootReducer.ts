import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from '@/slices/notification';
import userReducer from '@/slices/user';
import authReducer from '@/slices/auth';
import customerGroupReducer from '@/slices/customerGroup'
import customerReducer from '@/slices/customter-slice'
const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  auth: authReducer,
  customerGroup: customerGroupReducer,
  customer: customerReducer,
});

export default rootReducer;
