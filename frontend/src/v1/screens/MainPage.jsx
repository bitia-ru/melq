import React from 'react';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { css, StyleSheet } from '../aphrodite';

import { currentUser } from '@/v1/redux/user_session/utils';
import { loadPosts } from '@/v1/redux/posts/actions';

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
    this.props.loadPosts();
  }

  onCardClick = (post, e, target) => {
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
      this.props.history.push(`/${post.slug}`);
    }
  };

  render() {
    const { user, posts, editMode } = this.props;

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
              post => (
                <PostCard
                  post={post}
                  onClick={(e, target) => this.onCardClick(post, e, target)}
                  disabledCounter={false}
                  key={post.id}
                />
              ),
              R.values(posts),
            )
          }
        </div>
      </MainScreen>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
  editMode: PropTypes.bool,
  history: PropTypes.object,
  loadPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
  editMode: state.editMode,
});

const mapDispatchToProps = dispatch => ({ loadPosts: () => dispatch(loadPosts()) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
