import * as R from 'ramda';
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

export const createTag = (attributes, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_TAGS_REQUEST });

    Api.post(
      '/v1/tags',
      attributes,
      {
        dispatch,
        method: 'post',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_TAGS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const removeTags = (ids, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_TAGS_REQUEST });

    Api.post(
      '/v1/tags',
      { ids, tags: R.map(id => ({ id }), ids) },
      {
        dispatch,
        method: 'delete',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_TAGS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);
