import * as R from 'ramda';
import acts from './acts';

const INITIAL_VALUE = {
  numOfActiveRequests: 0,
  posts: {},
};

const postsReducer = (
  state = INITIAL_VALUE,
  action,
) => {
  switch (action.type) {
  case acts.LOAD_POSTS_REQUEST:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests + 1,
    };
  case acts.LOAD_POSTS_FAILED:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.LOAD_POSTS_SUCCESS:
    if (action.post) {
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.slug]: action.post,
        },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      posts: R.mergeDeepRight(
        state.posts,
        R.fromPairs(
          R.map(
            post => [post.slug, post],
            action.posts,
          ),
        ),
      ),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.REMOVE_POST_SUCCESS:
    return {
      ...state,
      posts: R.dissoc(action.slug, state.posts),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default postsReducer;
