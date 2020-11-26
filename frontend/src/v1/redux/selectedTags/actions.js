import acts from './acts';

export const setSelectedTagsIds = tagsIds => ({
  type: acts.SET_SELECTED_TAGS_IDS,
  tagsIds,
});

export default setSelectedTagsIds;
