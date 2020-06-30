import Api from '../../utils/Api';
import { acts as usersActs } from '../users/actions';


export const acts = {
  LOAD_USER_SESSION_REQUEST: 'LOAD_USER_SESSION_REQUEST_V1',
  LOAD_USER_SESSION_FAILED: 'LOAD_USER_SESSION_FAILED_V1',
  LOAD_USER_SESSION_SUCCESS: 'LOAD_USER_SESSION_SUCCESS_V1',
};


export const loadUserSession = () => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_USER_SESSION_REQUEST });

    Api.get(
      '/v1/user_sessions/self',
      {
        success(payload) {
          dispatch({
            type: acts.LOAD_USER_SESSION_SUCCESS,
            user_session: payload,
          });
          dispatch({
            type: usersActs.LOAD_USERS,
            user: payload.user,
          });
        },
        failed() {
          dispatch({ type: acts.LOAD_USER_SESSION_FAILED });
        },
      },
    );
  }
);
