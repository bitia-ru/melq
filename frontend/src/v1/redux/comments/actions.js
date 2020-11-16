import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';
import acts from './acts';

export const loadComments = postSlug => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_COMMENTS_REQUEST });

    Api.get(
      `/v1/posts/${postSlug}/comments`,
      {
        dispatch,
        failed(error) {
          dispatch({ type: acts.LOAD_COMMENTS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export const createComment = (attributes, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_COMMENTS_REQUEST });

    Api.post(
      '/v1/comments',
      attributes,
      {
        dispatch,
        method: 'post',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_COMMENTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const updateComment = (id, attributes, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_COMMENTS_REQUEST });

    Api.post(
      `/v1/comments/${id}`,
      attributes,
      {
        dispatch,
        method: 'patch',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_COMMENTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const removeComment = (id, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_COMMENTS_REQUEST });

    Api.post(
      `/v1/comments/${id}`,
      null,
      {
        dispatch,
        method: 'delete',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_COMMENTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);
