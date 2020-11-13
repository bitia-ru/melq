import React from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from '../layouts/MainScreen/MainScreen';
import { currentUser } from '@/v1/redux/user_session/utils';
import { loadPost } from '@/v1/redux/posts/actions';
import { loadComments } from '@/v1/redux/comments/actions';
import prepareImageUrls from '@/v1/utils/prepareImageUrls';
import PostComments from '../components/PostComments/PostComments';
import Button from '../components/Button/Button';
import LikeCounter from '../components/icon_counters/LikeCounter/LikeCounter';
import CommentCounter from '../components/icon_counters/CommentCounter/CommentCounter';
import Link from '../components/Link/Link';
import TwoColumnsLayout from '../layouts/TwoColumnsLayout';
import ShareCounter from '../components/icon_counters/ShareCounter/ShareCounter';
import ViewCounter from '../components/icon_counters/ViewCounter/ViewCounter';
import Item from '../components/Item/Item';

import { StyleSheet, css } from '../aphrodite';

import { bgColor, separatorColor, themeStyles, dateTopicCounterColor } from '../theme';

const styles = StyleSheet.create({
  container: { marginTop: 40 },
  mainContentWrapper: { paddingBottom: 80 },
  rightBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    backgroundColor: bgColor,
    paddingLeft: 62,
    paddingRight: 56,
    paddingTop: 32,
    paddingBottom: 32,
    marginBottom: 32,
  },
  commentBlock: {
    marginTop: 32,
    backgroundColor: bgColor,
    paddingLeft: 62,
    paddingRight: 56,
    paddingTop: 32,
    paddingBottom: 32,
  },
  deleteBtnWrapper: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  likeCounterContainer: {
    width: 72,
    paddingTop: 21,
    paddingRight: 10,
    paddingLeft: 17,
    paddingBottom: 21,
    border: `1px solid ${separatorColor}`,
  },
  commentCounterContainer: {
    width: 72,
    paddingTop: 21,
    paddingRight: 10,
    paddingLeft: 17,
    paddingBottom: 19,
    border: `1px solid ${separatorColor}`,
    borderTopWidth: 0,
  },
  deleteBtnLinkText: {
    marginLeft: 7,
    marginTop: 1,
  },
  deleteBtnInnerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  editBtnText: { marginLeft: 7 },
  topInfoBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareCounterWrapper: { marginLeft: 31 },
  viewCounterWrapper: { marginLeft: 32 },
  dateText: { color: dateTopicCounterColor },
  postTitle: {
    marginTop: 32,
    marginBottom: 14,
  },
  topicBlock: {
    borderTop: `1px solid ${separatorColor}`,
    paddingTop: 32,
    display: 'flex',
  },
  itemWrapper: { marginRight: 32 },
});

class PostShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.loadPost(slug);
    this.props.loadComments(slug);
  }

  prepareImageUrls = (content) => {
    if (!content) {
      return '';
    }
    const { posts } = this.props;
    const { slug } = this.props.match.params;
    const post = posts[slug];
    const lookUp = R.fromPairs(
      R.map(image => [image.original_filename, image.url], post.images),
    );
    return prepareImageUrls(lookUp, content);
  };

  render() {
    const { user, posts, history, editMode } = this.props;

    const post = posts[this.props.match.params.slug];

    return (
      <MainScreen header="" user={user}>
        <div className={css(styles.container)}>
          <TwoColumnsLayout>
            <div className={css(styles.mainContentWrapper)}>
              <div className={css(styles.mainContent)}>
                {
                  post && (
                    <div key={post.id}>
                      <div className={css(styles.topInfoBlock)}>
                        <span className={css(themeStyles.defaultFont, styles.dateText)}>
                          {dayjs(post.created_at).format('DD.MM.YYYY')}
                        </span>
                        <div className={css(styles.shareCounterWrapper)}>
                          <ShareCounter value={post.num_of_reposts} onClick={() => {}} />
                        </div>
                        <div className={css(styles.viewCounterWrapper)}>
                          <ViewCounter value={post.num_of_views} />
                        </div>
                      </div>
                      <div className={css(themeStyles.largeHeaderFont, styles.postTitle)}>
                        {post.title}
                      </div>
                      <div
                        dangerouslySetInnerHTML={
                          { __html: marked(this.prepareImageUrls(post.content || '')) }
                        }
                      />
                    </div>
                  )
                }
                <div className={css(styles.topicBlock)}>
                  {
                    R.map(
                      tag => (
                        <div className={css(styles.itemWrapper)}>
                          <Item
                            onTriggered={() => {}}
                            size="small"
                            iconSrc={require('../examples/images/demoItemIcon.png')}
                            text={tag.text}
                          />
                        </div>
                      ),
                      post?.tags || [],
                    )
                  }
                </div>
              </div>
              <PostComments />
            </div>
            <div className={css(styles.rightBlock)}>
              {
                editMode && (
                  <div className={css(styles.btnContainer)}>
                    <Button onClick={() => history.push(`/${post.slug}/edit`)}>
                      <div>
                        <svg width={16} height={16}>
                          <use
                            xlinkHref={`${require('../components/Button/images/edit.svg')}#edit`}
                          />
                        </svg>
                        <span className={css(styles.editBtnText)}>Редактировать</span>
                      </div>
                    </Button>
                    <div className={css(styles.deleteBtnWrapper)}>
                      <Link onTriggered={() => {}}>
                        <div className={css(styles.deleteBtnInnerContainer)}>
                          <svg width={16} height={16}>
                            <use xlinkHref={`${require('../components/Link/images/trash.svg')}#trash`} />
                          </svg>
                          <span className={css(styles.deleteBtnLinkText)}>Удалить</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              }
              <div className={css(styles.likeCounterContainer)}>
                <LikeCounter onClick={() => {}} value={post?.num_of_likes} />
              </div>
              <div className={css(styles.commentCounterContainer)}>
                <CommentCounter onClick={() => {}} value={post?.num_of_comments} />
              </div>
              {
                !editMode && (
                  <div />
                )
              }
            </div>
          </TwoColumnsLayout>
        </div>
      </MainScreen>
    );
  }
}

PostShow.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
  loadPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  loadComments: PropTypes.func,
  editMode: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
  editMode: state.editMode,
});

const mapDispatchToProps = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
  loadComments: slug => dispatch(loadComments(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostShow));
