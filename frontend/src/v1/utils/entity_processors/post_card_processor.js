import acts from '@/v1/redux/post_cards/acts';

const postCardProcessor = (dispatch, postCard) => {
  dispatch({
    type: acts.LOAD_POST_CARDS_SUCCESS,
    postCard,
  });
};

export default postCardProcessor;
