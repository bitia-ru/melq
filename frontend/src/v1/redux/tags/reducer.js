import * as R from 'ramda';
import acts from './acts';

const INITIAL_VALUE = {
  numOfActiveRequests: 0,
  tags: {},
};

const tagsReducer = (
  state = INITIAL_VALUE,
  action,
) => {
  switch (action.type) {
  case acts.LOAD_TAGS_SUCCESS:
    if (action.tag) {
      return {
        ...state,
        tags: {
          ...state.tags,
          [action.tag.id]: action.tag,
        },
        numOfActiveRequests: state.numOfActiveRequests - 1,
      };
    }
    return {
      ...state,
      tags: R.mergeDeepRight(
        state.tags,
        R.fromPairs(
          R.map(
            tag => [tag.id, tag],
            action.tags,
          ),
        ),
      ),
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default tagsReducer;
