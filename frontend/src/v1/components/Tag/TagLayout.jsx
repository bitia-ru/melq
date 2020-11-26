import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';

const TagLayout = ({ size, tag, onTriggered }) => (
  <Item
    size={size}
    text={tag.text}
    textMargin={size === 'small' ? '7px' : '14px'}
    onTriggered={onTriggered}
    focusable
    iconSrc={require('../../examples/images/demoItemIcon.png')}
  />
);

TagLayout.propTypes = {
  onTriggered: PropTypes.func,
  size: PropTypes.string,
  tag: PropTypes.object,
};

export default TagLayout;
