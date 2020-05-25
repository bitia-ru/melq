import { acts } from './actions';


const usersReducer = (
  state = {},
  action,
) => {
  switch (action.type) {
  case acts.LOAD_USER_SESSION_SUCCESS:
    return {
      ...state,
      ...action.user_session,
    };
  case acts.LOAD_USER_SESSION_FAILED:
    return {
      user_id: null,
    };
  default:
    return state;
  }
};

export default usersReducer;
