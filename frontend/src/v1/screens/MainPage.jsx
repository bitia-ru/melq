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
    id: 'published',
    text: 'Опубликованные',
  },
  {
    id: 'drafts',
    text: 'Черновики',
  },
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
  constructor(props) {
    super(props);
    this.state = { published: true };
  }

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
    const published = editMode ? this.state.published : true;

    return (
      <MainScreen header="" user={user}>
        <div className={css(styles.defaultHeader, editMode && styles.editModeHeader)}>
          {
            editMode && (
              <div className={css(styles.btnsContainer)}>
                <Button
                  onClick={
                    (index) => {
                      this.setState({ published: btns[index].id === 'published' });
                    }
                  }
                  size="big"
                  tooltipText={R.map(btn => btn.tooltipText, btns)}
                  tooltipSide={R.map(btn => btn.tooltipSide, btns)}
                  disabled={R.map(btn => btn.disabled, btns)}
                  btnStyle={
                    R.map(
                      (btn) => {
                        if (btn.id === 'published' && published) {
                          return 'info';
                        }
                        if (btn.id === 'drafts' && !published) {
                          return 'info';
                        }
                        return null;
                      },
                      btns,
                    )
                  }
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
              R.filter(card => card.published === published, R.values(postCards)),
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

const mapStateToProps = (state) => {
  const selectedTagsIds = R.reject(
    id => R.contains(id, state.unselectedTagsIds),
    R.map(t => t.id, R.values(state.tagsStoreV1.tags)),
  );
  return {
    user: currentUser(state),
    postCards: R.filter(
      postCard => (
        R.contains(postCard.main_tag_id, selectedTagsIds)
      ),
      state.postCardsStoreV1.postCards,
    ),
    editMode: state.editMode,
  };
};

const mapDispatchToProps = dispatch => ({ loadPostCards: () => dispatch(loadPostCards()) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
