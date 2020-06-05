export const currentUser = (state) => { // eslint-disable-line import/prefer-default-export
  if (state.userSessionV1.user_sessions.self.user_id === null) {
    return null;
  }

  return state.userSessionV1.user_sessions.self.user_id
    ? state.usersStoreV1.users[state.userSessionV1.user_sessions.self.user_id]
    : undefined;
};
