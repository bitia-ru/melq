import * as R from 'ramda';
import { acts } from './actions';
import DEFAULT_STORE_FORMAT from './constants/defaultStoreFormat';

const postsReducer = (
  state = DEFAULT_STORE_FORMAT,
  action,
) => {
  const findAndUpdateComment1 = (comments) => {
    const index = R.findIndex(R.propEq('id', action.comment.comment_id))(comments);
    if (index !== -1) {
      return [
        ...R.slice(0, index, comments),
        {
          ...comments[index],
          comments: [...comments[index].comments, action.comment],
        },
        ...R.slice(index + 1, Infinity, comments),
      ];
    }
    return R.map(
      comment => (
        { ...comment, comments: findAndUpdateComment1(comment.comments) }
      ),
      comments,
    );
  };
  const findAndUpdateComment2 = (comments) => {
    const index = R.findIndex(R.propEq('id', action.comment.id))(comments);
    if (index !== -1) {
      return [
        ...R.slice(0, index, comments),
        action.comment,
        ...R.slice(index + 1, Infinity, comments),
      ];
    }
    return R.map(
      comment => (
        { ...comment, comments: findAndUpdateComment2(comment.comments) }
      ),
      comments,
    );
  };
  const findAndRemoveComment = (comments) => {
    const index = R.findIndex(R.propEq('id', action.commentId))(comments);
    if (index !== -1) {
      return R.remove(index, 1, comments);
    }
    return R.map(
      comment => (
        { ...comment, comments: findAndRemoveComment(comment.comments) }
      ),
      comments,
    );
  };

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
        posts: { [action.post.slug]: action.post },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      posts: R.mergeDeepRight(
        state.posts,
        R.fromPairs(R.map(post => [post.slug, post], action.posts)),
      ),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.REMOVE_POST_SUCCESS:
    return {
      ...state,
      posts: R.dissoc(action.slug, state.posts),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.LOAD_POST_COMMENTS_SUCCESS:
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.postSlug]: {
          ...state.posts[action.postSlug],
          comments: action.comments,
        },
      },
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.CREATE_COMMENT_SUCCESS:
    if (action.comment.comment_id === null) {
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.postSlug]: {
            ...state.posts[action.postSlug],
            comments: [
              ...state.posts[action.postSlug].comments,
              action.comment,
            ],
          },
        },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.postSlug]: {
          ...state.posts[action.postSlug],
          comments: findAndUpdateComment1(state.posts[action.postSlug].comments),
        },
      },
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.UPDATE_COMMENT_SUCCESS:
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.postSlug]: {
          ...state.posts[action.postSlug],
          comments: findAndUpdateComment2(state.posts[action.postSlug].comments),
        },
      },
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.REMOVE_COMMENT_SUCCESS:
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.postSlug]: {
          ...state.posts[action.postSlug],
          comments: findAndRemoveComment(state.posts[action.postSlug].comments),
        },
      },
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default postsReducer;
