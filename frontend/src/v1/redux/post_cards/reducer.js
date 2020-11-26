import * as R from 'ramda';
import acts from './acts';

const INITIAL_VALUE = {
  numOfActiveRequests: 0,
  postCards: {},
};

const postCardsReducer = (
  state = INITIAL_VALUE,
  action,
) => {
  switch (action.type) {
  case acts.LOAD_POST_CARDS_REQUEST:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests + 1,
    };
  case acts.LOAD_POST_CARDS_FAILED:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.LOAD_POST_CARDS_SUCCESS:
    if (action.postCard) {
      return {
        ...state,
        postCards: {
          ...state.postCards,
          [action.postCard.id]: action.postCard,
        },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      postCards: R.mergeDeepRight(
        state.postCards,
        R.fromPairs(
          R.map(
            postCard => [postCard.id, postCard],
            action.postCards,
          ),
        ),
      ),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default postCardsReducer;
