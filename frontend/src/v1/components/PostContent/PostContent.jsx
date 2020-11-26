import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import marked from 'marked';
import * as R from 'ramda';

import ShareCounter from '../icon_counters/ShareCounter/ShareCounter';
import ViewCounter from '../icon_counters/ViewCounter/ViewCounter';
import Tag from '../Tag/Tag';

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

const PostContent = ({ post, images, postOrigin, slug, imagesUpdatedNames, removedImagesIds }) => {
  const prepareImageUrls = (content) => {
    if (!content) {
      return '';
    }
    let lookUp;
    if (slug) {
      lookUp = R.fromPairs(
        R.concat(
          R.map(
            image => [imagesUpdatedNames[image.id] || image.original_filename, image.url],
            R.reject(a => R.contains(a.id, removedImagesIds), (postOrigin || post).images || []),
          ),
          R.map(image => [image.name, image.content], images || post.images),
        ),
      );
    } else {
      lookUp = R.fromPairs(R.map(image => [image.name, image.content], images));
    }
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
                <Tag
                  onTriggered={() => {}}
                  size="small"
                  tag={tag}
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

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
  postOrigin: PropTypes.object,
  images: PropTypes.array,
  slug: PropTypes.string,
  imagesUpdatedNames: PropTypes.object,
  removedImagesIds: PropTypes.array,
};

PostContent.defaultProps = {
  imagesUpdatedNames: {},
  removedImagesIds: [],
};

export default PostContent;
