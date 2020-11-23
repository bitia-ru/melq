import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Card from '../Card/Card';
import LikeCounter from '../icon_counters/LikeCounter/LikeCounter';
import CommentCounter from '../icon_counters/CommentCounter/CommentCounter';
import ShareCounter from '../icon_counters/ShareCounter/ShareCounter';
import ViewCounter from '../icon_counters/ViewCounter/ViewCounter';
import {
  bgColor,
  mainFontColor,
  disabledBtnColor,
  cardColors,
  dateTopicCounterColor,
  themeStyles,
} from '@/v1/theme';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    color: dateTopicCounterColor,
  },
  header: { padding: '21px 24px 13px 24px' },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '326px',
    margin: '0px 24px auto 24px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '203px',
    overflow: 'hidden',
  },
  secondaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '123px',
    margin: '15px 0px',
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '27px',
    color: mainFontColor,
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    color: mainFontColor,
  },
  countersWrapper: {
    height: '73px',
    display: 'flex',
    marginLeft: '24px',
    marginRight: '54px',
    justifyContent: 'flex-start',
  },
  hr: {
    display: 'flex',
    height: '1px',
    backgroundColor: disabledBtnColor,
    border: 'none',
    width: '100%',
    margin: '0px',
  },
});

const PostCardLayout = ({ post, onClick, getDisabled }) => (
  <Card
    height="468px"
    width="390px"
    backgroundColor={post.card?.fill_color || bgColor}
    onClick={onClick}
  >
    <div className={css(styles.headerWrapper)}>
      <span className={css(styles.header)}>
        {
          dayjs(post.created_at).format('DD.MM.YYYY')
        }
      </span>
      <span className={css(styles.header)}>{post?.card?.main_tag?.text}</span>
    </div>
    {
      post.card?.image
        ? (
          <div className={css(styles.contentWrapper)}>
            <div className={css(styles.mainContainer)}>
              <img src={post.card.image.url} alt="" />
            </div>
            <div className={css(styles.secondaryContainer)}>
              <div className={css(styles.title)}>
                {post.card.title}
              </div>
              <div className={css(styles.content, themeStyles.smallDetailsFont)}>
                {post.card.description}
              </div>
            </div>
          </div>
        ) : (
          <div className={css(styles.contentWrapper)}>
            <div className={css(styles.mainContainer)}>
              <div className={css(styles.title)}>
                {post.card.title}
              </div>
              <div className={css(styles.content, themeStyles.smallDetailsFont)}>
                {post.card.description}
              </div>
            </div>
          </div>
        )
    }
    <hr className={css(styles.hr)} />
    <div className={css(styles.countersWrapper)}>
      <LikeCounter
        checked={false}
        disabled={getDisabled('like')}
        value={post.num_of_likes}
        onClick={e => onClick(e, 'like')}
      />
      <CommentCounter
        disabled={getDisabled('comment')}
        value={post.num_of_comments}
        onClick={e => onClick(e, 'comment')}
      />
      <ShareCounter
        disabled={getDisabled('share')}
        value={post.num_of_reposts}
        onClick={e => onClick(e, 'share')}
      />
      <ViewCounter
        disabled={getDisabled('view')}
        value={post.num_of_views}
        hoverable={false}
      />
    </div>
  </Card>
);

PostCardLayout.propTypes = {
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  getDisabled: PropTypes.func.isRequired,
};

export default PostCardLayout;
