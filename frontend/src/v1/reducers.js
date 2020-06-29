import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as usersReducerV1 } from '@/v1/redux/users/reducer';
import { default as postsReducerV1 } from '@/v1/redux/posts/reducer';
import { default as commentsReducerV1 } from '@/v1/redux/comments/reducer';
import { default as tagsReducerV1 } from '@/v1/redux/tags/reducer';
import { default as userSessionReducerV1 } from '@/v1/redux/user_session/reducer';

export default combineReducers({
  usersStoreV1: usersReducerV1,
  postsStoreV1: postsReducerV1,
  commentsStoreV1: commentsReducerV1,
  tagsStoreV1: tagsReducerV1,
  userSessionV1: userSessionReducerV1,
  form: formReducer,
});
