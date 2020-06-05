import Api from '../../utils/Api';
import acts from './acts';
import { default as usersActs } from '../users/acts';

export const loadUserSession = () => ( // eslint-disable-line import/prefer-default-export
  (dispatch) => {
    dispatch({ type: acts.LOAD_USER_SESSION_REQUEST });

    Api.get(
      '/v1/user_sessions/self',
      {
        dispatch,
        success(data) {
          dispatch({
            type: usersActs.LOAD_USERS,
            user: data.entities.user_session.user,
          });
        },
        failed() {
          dispatch({ type: acts.LOAD_USER_SESSION_FAILED });
        },
      },
    );
  }
);
