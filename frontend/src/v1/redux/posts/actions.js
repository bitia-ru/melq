import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';

export const acts = {
  LOAD_POSTS_REQUEST: 'LOAD_POSTS_REQUEST_V1',
  LOAD_POSTS_FAILED: 'LOAD_POSTS_FAILED_V1',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS_V1',
  REMOVE_POST_SUCCESS: 'REMOVE_POST_SUCCESS_V1',
  LOAD_POST_COMMENTS_SUCCESS: 'LOAD_POST_COMMENTS_SUCCESS_V1',
  CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS_V1',
  UPDATE_COMMENT_SUCCESS: 'UPDATE_COMMENT_SUCCESS_V1',
  REMOVE_COMMENT_SUCCESS: 'REMOVE_COMMENT_SUCCESS_V1',
};

export const loadPosts = () => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.get(
      '/v1/posts',
      {
        success(payload) {
          dispatch({
            type: acts.LOAD_POSTS_SUCCESS,
            posts: payload,
          });
        },
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
        success(payload) {
          dispatch({
            type: acts.LOAD_POSTS_SUCCESS,
            post: payload,
          });
        },
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export const createPost = (params, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      '/v1/posts',
      params,
      {
        method: 'post',
        type: 'form-multipart',
        success(payload) {
          dispatch({
            type: acts.LOAD_POSTS_SUCCESS,
            post: payload,
          });
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

export const updatePost = (slug, params, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      `/v1/posts/${slug}`,
      params,
      {
        method: 'patch',
        type: 'form-multipart',
        success(payload) {
          dispatch({
            type: acts.LOAD_POSTS_SUCCESS,
            post: payload,
          });
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
        method: 'delete',
        success(payload) {
          dispatch({
            type: acts.REMOVE_POST_SUCCESS,
            slug: payload.slug,
          });
          afterSuccess && afterSuccess(payload);
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

export const loadComments = (postSlug) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.get(
      `/v1/posts/${postSlug}/comments`,
      {
        success(payload) {
          dispatch({
            type: acts.LOAD_POST_COMMENTS_SUCCESS,
            postSlug,
            comments: payload,
          });
        },
        failed(error) {
          dispatch({ type: acts.LOAD_POSTS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export const createComment = (postSlug, params, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POSTS_REQUEST });

    Api.post(
      '/v1/comments',
      params,
      {
        method: 'post',
        success(payload) {
          dispatch({
            type: acts.CREATE_COMMENT_SUCCESS,
            postSlug,
            comment: payload,
          });
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

export const updateComment = (postSlug, id, params, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({
      type: acts.LOAD_POSTS_REQUEST,
    });

    Api.post(
      `/v1/comments/${id}`,
      params,
      {
        method: 'patch',
        success(payload) {
          dispatch({
            type: acts.UPDATE_COMMENT_SUCCESS,
            postSlug: postSlug,
            comment: payload,
          });
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({
            type: acts.LOAD_POSTS_FAILED,
          });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);

export const removeComment = (postSlug, id, afterSuccess, afterAll) => (
  (dispatch) => {
    dispatch({
      type: acts.LOAD_POSTS_REQUEST,
    });

    Api.post(
      `/v1/comments/${id}`,
      null,
      {
        method: 'delete',
        success(payload) {
          dispatch({
            type: acts.REMOVE_COMMENT_SUCCESS,
            postSlug: postSlug,
            commentId: payload.id,
          });
          afterSuccess && afterSuccess();
          afterAll && afterAll();
        },
        failed(error) {
          dispatch({
            type: acts.LOAD_POSTS_FAILED,
          });
          afterAll && afterAll();

          toastHttpError(error);
        },
      },
    );
  }
);
