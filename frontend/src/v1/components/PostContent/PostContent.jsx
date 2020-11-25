import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import marked from 'marked';
import * as R from 'ramda';

import ShareCounter from '../icon_counters/ShareCounter/ShareCounter';
import ViewCounter from '../icon_counters/ViewCounter/ViewCounter';
import Theme from '../Theme/Theme';

import { default as prepareImageUrlsUtils } from '../../utils/prepareImageUrls';

import {
  bgColor,
  dateTopicCounterColor,
  themeStyles,
  separatorColor,
} from '@/v1/theme';

import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: bgColor,
    paddingLeft: 62,
    paddingRight: 56,
    paddingTop: 32,
    paddingBottom: 32,
    marginBottom: 32,
  },
  topInfoBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: { color: dateTopicCounterColor },
  shareCounterWrapper: { marginLeft: 31 },
  viewCounterWrapper: { marginLeft: 32 },
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

const PostContent = ({ post }) => {
  const prepareImageUrls = (content) => {
    if (!content) {
      return '';
    }
    const lookUp = R.fromPairs(
      R.map(image => [image.original_filename, image.url], post.images),
    );
    return prepareImageUrlsUtils(lookUp, content);
  };

  return (
    <div className={css(styles.mainContent)}>
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
            { __html: marked(prepareImageUrls(post.content || '')) }
          }
        />
      </div>
      <div className={css(styles.topicBlock)}>
        {
          R.map(
            tag => (
              <div className={css(styles.itemWrapper)}>
                <Theme
                  onTriggered={() => {}}
                  size="small"
                  theme={tag}
                />
              </div>
            ),
            post?.tags || [],
          )
        }
      </div>
    </div>
  );
};

PostContent.propTypes = { post: PropTypes.object.isRequired };

export default PostContent;
