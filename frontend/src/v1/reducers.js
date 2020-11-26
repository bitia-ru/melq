import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as usersReducerV1 } from '@/v1/redux/users/reducer';
import { default as postsReducerV1 } from '@/v1/redux/posts/reducer';
import { default as commentsReducerV1 } from '@/v1/redux/comments/reducer';
import { default as tagsReducerV1 } from '@/v1/redux/tags/reducer';
import { default as userSessionReducerV1 } from '@/v1/redux/user_session/reducer';
import { default as editModeReducerV1 } from '@/v1/redux/editMode/reducer';
import { default as settingsReducerV1 } from '@/v1/redux/settings/reducer';
import { default as selectedTagsIdsReducerV1 } from '@/v1/redux/selectedTags/reducer';
import { default as postCardsReducerV1 } from '@/v1/redux/post_cards/reducer';

export default combineReducers({
  usersStoreV1: usersReducerV1,
  postsStoreV1: postsReducerV1,
  postCardsStoreV1: postCardsReducerV1,
  commentsStoreV1: commentsReducerV1,
  tagsStoreV1: tagsReducerV1,
  userSessionV1: userSessionReducerV1,
  form: formReducer,
  editMode: editModeReducerV1,
  settingsStoreV1: settingsReducerV1,
  selectedTagsIds: selectedTagsIdsReducerV1,
});
