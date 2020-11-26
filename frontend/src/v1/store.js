import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import localForage from 'localforage';
import rootReducer from './reducers';

import { INITIAL_VALUE as POSTS_DEFAULT_STORE_FORMAT } from '@/v1/redux/posts/reducer';

export const saveState = (state) => {
  try {
    const data = {};
    data.editMode = state.editMode;
    data.selectedTagsIds = state.selectedTagsIds;
    data.posts = state.postsStoreV1.posts;

    localForage.setItem('reduxState', data);
  } catch (err) {
    console.log('Error saving redux state', err);
  }
};

const getDataFromLocalForagePromise = () => (
  new Promise((resolve) => {
    localForage.getItem('reduxState', (err, data) => {
      if (err) {
        resolve(undefined);
      } else {
        const state = {};

        try {
          state.editMode = data.editMode;
          state.selectedTagsIds = data.selectedTagsIds;
          state.postsStoreV1 = POSTS_DEFAULT_STORE_FORMAT;
          state.postsStoreV1.posts = data.posts;

          resolve(state);
        } catch (_err) {
          resolve(undefined);
        }
      }
    });
  })
);

async function getDataFromLocalForage() {
  const state = await getDataFromLocalForagePromise();
  return state;
}

export const configureStoreAsync = () => (
  new Promise((resolve) => {
    try {
      getDataFromLocalForage().then((state) => {
        const store = createStore(rootReducer, state, applyMiddleware(thunk));
        resolve(store);
      });
    } catch (error) {
      const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
      resolve(store);
    }
  })
);
