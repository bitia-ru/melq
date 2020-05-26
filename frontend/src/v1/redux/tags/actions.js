import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';


export const acts = {
  LOAD_TAGS_REQUEST: 'LOAD_TAGS_REQUEST_V1',
  LOAD_TAGS_FAILED: 'LOAD_TAGS_FAILED_V1',
  LOAD_TAGS_SUCCESS: 'LOAD_TAGS_SUCCESS_V1',
};

export const loadTags = () => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_TAGS_REQUEST });

    Api.get(
      '/v1/tags',
      {
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
