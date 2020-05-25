import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';

export const acts = {
  LOAD_USERS_REQUEST: 'LOAD_USERS_REQUEST_V1',
  LOAD_USERS_FAILED: 'LOAD_USER_FAILED_V1',
  LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS_V1',
  LOAD_USERS: 'LOAD_USERS_V1',
};

export const loadUsers = () => (
  (dispatch) => {
    dispatch({
      type: acts.LOAD_USERS_REQUEST,
    });

    Api.get(
      '/v1/users',
      {
        success(payload) {
          dispatch({
            type: acts.LOAD_USERS_SUCCESS,
            users: payload,
          });
        },
        failed(error) {
          dispatch({
            type: acts.LOAD_USERS_FAILED,
          });

          toastHttpError(error);
        },
      },
    );
  }
);
