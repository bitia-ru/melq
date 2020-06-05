import acts from '@/v1/redux/users/acts';

const userProcessor = (dispatch, user) => {
  dispatch({
    type: acts.LOAD_USERS_SUCCESS,
    user,
  });
};

export default userProcessor;
