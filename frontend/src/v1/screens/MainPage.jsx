import React from 'react';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { css, StyleSheet } from '../aphrodite';

import { currentUser } from '@/v1/redux/user_session/utils';
import loadPostCards from '@/v1/redux/post_cards/actions';

import MainScreen from '../layouts/MainScreen/MainScreen';
import PostCard from '../components/PostCard/PostCard';
import Button from '../components/Button/Button';

const mapIndexed = R.addIndex(R.map);

const btns = [
  {
    text: 'Опубликованные',
    style: 'info',
  },
  { text: 'Черновики' },
];

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: -2,
    marginLeft: -32,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  defaultHeader: { marginTop: 12 },
  editModeHeader: { marginTop: 30 },
  btnsContainer: { width: 289 },
});

class MainPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadPostCards();
  }

  onCardClick = (postCard, e, target) => {
    e.stopPropagation();
    switch (target) {
    case 'like':
      console.log('Click on like counter');
      break;
    case 'comment':
      console.log('Redirect to comment');
      break;
    case 'share':
      console.log('Share post');
      break;
    default:
      this.props.history.push(`/${postCard.post_slug}`);
    }
  };

  render() {
    const { user, postCards, editMode } = this.props;

    return (
      <MainScreen header="" user={user}>
        <div className={css(styles.defaultHeader, editMode && styles.editModeHeader)}>
          {
            editMode && (
              <div className={css(styles.btnsContainer)}>
                <Button
                  onClick={() => {}}
                  size="big"
                  tooltipText={R.map(btn => btn.tooltipText, btns)}
                  tooltipSide={R.map(btn => btn.tooltipSide, btns)}
                  disabled={R.map(btn => btn.disabled, btns)}
                  btnStyle={R.map(btn => btn.style, btns)}
                  isWaiting={R.map(btn => btn.isWaiting, btns)}
                >
                  {
                    mapIndexed(
                      (btn, index) => (
                        <div key={index}>{btn.text}</div>
                      ),
                      btns,
                    )
                  }
                </Button>
              </div>
            )
          }
        </div>
        <div className={css(styles.cardsWrapper)}>
          {
            R.map(
              postCard => (
                <PostCard
                  data={postCard}
                  onClick={(e, target) => this.onCardClick(postCard, e, target)}
                  disabledCounter={false}
                  key={postCard.id}
                />
              ),
              R.values(postCards),
            )
          }
        </div>
      </MainScreen>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  postCards: PropTypes.object,
  editMode: PropTypes.bool,
  history: PropTypes.object,
  loadPostCards: PropTypes.func,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  postCards: R.filter(
    postCard => (
      R.contains(postCard.main_tag_id, state.selectedTagsIds)
    ),
    state.postCardsStoreV1.postCards,
  ),
  editMode: state.editMode,
});

const mapDispatchToProps = dispatch => ({ loadPostCards: () => dispatch(loadPostCards()) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
