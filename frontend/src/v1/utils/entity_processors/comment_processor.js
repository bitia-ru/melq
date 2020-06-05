import acts from '@/v1/redux/comments/acts';

const commentProcessor = (dispatch, comment) => {
  if (comment._destroy) { // eslint-disable-line no-underscore-dangle
    dispatch({
      type: acts.REMOVE_COMMENT_SUCCESS,
      id: comment.id,
    });
    return;
  }
  dispatch({
    type: acts.LOAD_COMMENTS_SUCCESS,
    comment,
  });
};

export default commentProcessor;
