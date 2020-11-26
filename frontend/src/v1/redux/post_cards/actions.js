import Api from '../../utils/Api';
import toastHttpError from '@/v1/utils/toastHttpError';
import acts from './acts';

const loadPostCards = () => (
  (dispatch) => {
    dispatch({ type: acts.LOAD_POST_CARDS_REQUEST });

    Api.get(
      '/v1/post_cards',
      {
        dispatch,
        failed(error) {
          dispatch({ type: acts.LOAD_POST_CARDS_FAILED });

          toastHttpError(error);
        },
      },
    );
  }
);

export default loadPostCards;
