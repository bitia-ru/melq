import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';
import acts from './acts';

export const loadPosts = () => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.get(
      '/v1/posts',
      {
        dispatch,
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export const loadPost = slug => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.get(
      `/v1/posts/${slug}`,
      {
        dispatch,
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export const createPost = (attributes, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      '/v1/posts',
      attributes,
      {
        dispatch,
        method: 'post',
        type: 'form-multipart',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const updatePost = (slug, attributes, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      `/v1/posts/${slug}`,
      attributes,
      {
        dispatch,
        method: 'patch',
        type: 'form-multipart',
        success() {
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const removePost = (slug, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      `/v1/posts/${slug}`,
      null,
      {
        dispatch,
        method: 'delete',
        success(entities) {
          afterSuccess && afterSuccess(entities.post);
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);
