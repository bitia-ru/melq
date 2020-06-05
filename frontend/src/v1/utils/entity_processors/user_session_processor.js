import acts from '@/v1/redux/user_session/acts';

const userSessionProcessor = (dispatch, userSession) => {
  dispatch({
    type: acts.LOAD_USER_SESSION_SUCCESS,
    user_session: userSession,
  });
};

export default userSessionProcessor;
