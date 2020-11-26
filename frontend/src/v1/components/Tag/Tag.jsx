import React from 'react';
import PropTypes from 'prop-types';
import TagLayout from './TagLayout';

const Tag = ({ size, tag, onTriggered }) => (
  <TagLayout size={size} tag={tag} onTriggered={onTriggered} />
);

Tag.propTypes = {
  size: PropTypes.string,
  tag: PropTypes.object,
  onTriggered: PropTypes.func,
};

export default Tag;
