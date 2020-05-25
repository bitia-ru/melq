import { combineReducers } from 'redux';
import { default as usersReducerV1 } from '@/v1/redux/users/reducer';
import { default as userSessionReducerV1 } from '@/v1/redux/user_session/reducer';

export default combineReducers({
  usersStoreV1: usersReducerV1,
  userSessionV1: userSessionReducerV1,
});
