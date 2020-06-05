import acts from '@/v1/redux/tags/acts';

const tagProcessor = (dispatch, tag) => {
  dispatch({
    type: acts.LOAD_TAGS_SUCCESS,
    tag,
  });
};

export default tagProcessor;
