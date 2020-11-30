import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import TagSettingsLayout from './TagSettingsLayout';

const DEFAULT_DISPLAYED_LENGTH = 7;

const TagSettings = ({ tags, setUpTags }) => {
  const [showMoreBtnVisible, setShowMoreBtnVisible] = useState(
    tags.length > DEFAULT_DISPLAYED_LENGTH,
  );

  useEffect(() => setShowMoreBtnVisible(tags.length > DEFAULT_DISPLAYED_LENGTH), [tags]);

  return (
    <TagSettingsLayout
      tags={
        showMoreBtnVisible ? R.slice(0, DEFAULT_DISPLAYED_LENGTH, tags) : tags
      }
      onItemTriggered={() => {}}
      setUpTags={setUpTags}
      onShowMore={() => setShowMoreBtnVisible(false)}
      showMoreCount={showMoreBtnVisible ? tags.length - DEFAULT_DISPLAYED_LENGTH : 0}
    />
  );
};

TagSettings.propTypes = {
  tags: PropTypes.array,
  setUpTags: PropTypes.func,
};

TagSettings.defaultProps = { tags: [] };

const mapStateToProps = state => ({
  tags: (
    R.reject(
      tag => R.contains(tag.id, state.unselectedTagsIds),
      R.values(state.tagsStoreV1.tags),
    )
  ),
});

export default connect(mapStateToProps)(TagSettings);
