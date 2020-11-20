import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { loadTags as loadTagsAction } from '@/v1/redux/tags/actions';

import ThemeSettingsLayout from './ThemeSettingsLayout';

const DEFAULT_DISPLAYED_LENGTH = 7;

const ThemeSettings = ({ themes, loadTags }) => {
  const [showMoreBtnVisible, setShowMoreBtnVisible] = useState(
    themes.length > DEFAULT_DISPLAYED_LENGTH,
  );

  useEffect(() => setShowMoreBtnVisible(themes.length > DEFAULT_DISPLAYED_LENGTH), [themes]);

  useEffect(loadTags, []);

  return (
    <ThemeSettingsLayout
      themes={
        showMoreBtnVisible ? R.slice(0, DEFAULT_DISPLAYED_LENGTH, themes) : themes
      }
      onItemTriggered={() => {}}
      onShowMore={() => setShowMoreBtnVisible(false)}
      showMoreCount={showMoreBtnVisible ? themes.length - DEFAULT_DISPLAYED_LENGTH : 0}
    />
  );
};

ThemeSettings.propTypes = {
  themes: PropTypes.array,
  loadTags: PropTypes.func,
};

ThemeSettings.defaultProps = { themes: [] };

const mapStateToProps = state => ({ themes: R.values(state.tagsStoreV1.tags) });

const mapDispatchToProps = dispatch => ({ loadTags: () => dispatch(loadTagsAction()) });

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings);
