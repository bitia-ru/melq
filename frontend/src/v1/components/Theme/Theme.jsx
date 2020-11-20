import React from 'react';
import PropTypes from 'prop-types';
import ThemeLayout from './ThemeLayout';

const Theme = ({ size, theme, onTriggered }) => (
  <ThemeLayout size={size} theme={theme} onTriggered={onTriggered} />
);

Theme.propTypes = {
  size: PropTypes.string,
  theme: PropTypes.object,
  onTriggered: PropTypes.func,
};

export default Theme;
