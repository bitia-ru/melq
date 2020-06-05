import * as R from 'ramda';
import acts from './acts';

const INITIAL_VALUE = {
  numOfActiveRequests: 0,
  comments: {},
};

const commentsReducer = (
  state = INITIAL_VALUE,
  action,
) => {
  switch (action.type) {
  case acts.LOAD_COMMENTS_REQUEST:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests + 1,
    };
  case acts.LOAD_COMMENTS_FAILED:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.LOAD_COMMENTS_SUCCESS:
    if (action.comment) {
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment,
        },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      comments: R.mergeDeepRight(
        state.comments,
        R.fromPairs(
          R.map(
            comment => [comment.id, comment],
            action.comments,
          ),
        ),
      ),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.REMOVE_COMMENT_SUCCESS:
    return {
      ...state,
      comments: R.dissoc(action.id, state.comments),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default commentsReducer;
