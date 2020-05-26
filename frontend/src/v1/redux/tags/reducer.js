import { acts } from './actions';
import DEFAULT_STORE_FORMAT from './constants/defaultStoreFormat';


const tagsReducer = (
  state = DEFAULT_STORE_FORMAT,
  action,
) => {
  switch (action.type) {
  case acts.LOAD_TAGS_REQUEST:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests + 1,
    };
  case acts.LOAD_TAGS_FAILED:
    return {
      ...state,
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  case acts.LOAD_TAGS_SUCCESS:
    return {
      ...state,
      tags: action.tags,
      numOfActiveRequests: state.numOfActiveRequests - 1,
    };
  default:
    return state;
  }
};

export default tagsReducer;
