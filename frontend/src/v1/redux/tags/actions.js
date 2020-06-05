import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';
import acts from './acts';

export const loadTags = () => ( // eslint-disable-line import/prefer-default-export
  (dispatch) => {
    dispatch({ type: acts.LOAD_TAGS_REQUEST });

    Api.get(
      '/v1/tags',
      {
        dispatch,
        success(payload) {
          dispatch({
            type: acts.LOAD_TAGS_SUCCESS,
            tags: payload,
          });
        },
        failed(error) {
          dispatch({ type: acts.LOAD_TAGS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);
