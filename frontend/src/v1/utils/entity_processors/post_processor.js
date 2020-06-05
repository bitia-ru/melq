import acts from '@/v1/redux/posts/acts';

const postProcessor = (dispatch, post) => {
  if (post._destroy) { // eslint-disable-line no-underscore-dangle
    dispatch({
      type: acts.REMOVE_POST_SUCCESS,
      slug: post.slug,
    });
    return;
  }
  dispatch({
    type: acts.LOAD_POSTS_SUCCESS,
    post,
  });
};

export default postProcessor;
