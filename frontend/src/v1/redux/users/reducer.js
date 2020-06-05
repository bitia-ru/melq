import * as R from 'ramda';
import acts from './acts';

const usersReducer = (
  state = { users: {} },
  action,
) => {
  switch (action.type) {
  case acts.LOAD_USERS:
  case acts.LOAD_USERS_SUCCESS:
    if (action.user) {
      return {
        users: {
          ...state.users,
          [action.user.id]: action.user,
        },
      };
    }
    return {
      users: {
        ...state.users,
        ...R.reduce((l, u) => ({ ...l, [u.id]: u }), {})(action.users),
      },
    };
  default:
    return state;
  }
};

export default usersReducer;
