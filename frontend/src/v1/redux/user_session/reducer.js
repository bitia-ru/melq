import acts from './acts';

const userSessionsReducer = (
  state = { user_sessions: { self: {} } },
  action,
) => {
  switch (action.type) {
  case acts.LOAD_USER_SESSION_SUCCESS:
    return {
      user_sessions: {
        ...state.user_sessions,
        self: action.user_session,
      },
    };
  case acts.LOAD_USER_SESSION_FAILED:
    return {
      user_sessions: {
        ...state.user_sessions,
        self: { user_id: null },
      },
    };
  default:
    return state;
  }
};

export default userSessionsReducer;
