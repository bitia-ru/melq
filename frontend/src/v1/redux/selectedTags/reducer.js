import acts from './acts';

const selectedTagsIdsReducer = (state = [], action) => {
  switch (action.type) {
  case acts.SET_SELECTED_TAGS_IDS:
    return action.tagsIds;
  default:
    return state;
  }
};

export default selectedTagsIdsReducer;
