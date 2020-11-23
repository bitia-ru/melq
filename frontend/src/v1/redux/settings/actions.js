import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';
import acts from './acts';

export const loadSettings = () => ( // eslint-disable-line import/prefer-default-export
  (dispatch) => {
    dispatch({ type: acts.LOAD_SETTINGS_REQUEST });

    Api.get(
      '/v1/settings/1',
      {
        dispatch,
        failed(error) {
          dispatch({ type: acts.LOAD_SETTINGS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);
