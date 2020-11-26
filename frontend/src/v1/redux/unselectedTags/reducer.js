import acts from './acts';

const unselectedTagsIdsReducer = (state = [], action) => {
  switch (action.type) {
  case acts.SET_UNSELECTED_TAGS_IDS:
    return action.tagsIds;
  default:
    return state;
  }
};

export default unselectedTagsIdsReducer;
