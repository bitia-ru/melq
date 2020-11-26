import acts from './acts';

export const setUnselectedTagsIds = tagsIds => ({
  type: acts.SET_UNSELECTED_TAGS_IDS,
  tagsIds,
});

export default setUnselectedTagsIds;
