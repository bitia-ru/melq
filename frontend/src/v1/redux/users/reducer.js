import * as R from 'ramda';
import { acts } from './actions';


const usersReducer = (
  state = { store: {} },
  action,
) => {
  switch (action.type) {
  case acts.LOAD_USERS:
  case acts.LOAD_USERS_SUCCESS:
    if (action.user) {
      return {
        store: {
          ...state.store,
          [action.user.id]: action.user,
        },
      };
    }
    return {
      store: {
        ...state.store,
        ...R.reduce((l, u) => ({ ...l, [u.id]: u }), {})(action.users),
      },
    };
  default:
    return state;
  }
};

export default usersReducer;
