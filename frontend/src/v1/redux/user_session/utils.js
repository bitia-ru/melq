export const currentUser = (state) => { // eslint-disable-line import/prefer-default-export
  if (state.userSessionV1.user_id === null) {
    return null;
  }

  return state.userSessionV1.user_id
    ? state.usersStoreV1.store[state.userSessionV1.user_id]
    : undefined;
};
