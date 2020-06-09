import acts from '@/v1/redux/tags/acts';

const tagProcessor = (dispatch, tag) => {
  if (tag._destroy) {
    dispatch({
      type: acts.REMOVE_TAG_SUCCESS,
      id: tag.id,
    });
    return;
  }
  dispatch({
    type: acts.LOAD_TAGS_SUCCESS,
    tag,
  });
};

export default tagProcessor;
