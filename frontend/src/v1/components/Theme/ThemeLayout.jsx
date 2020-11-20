import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';

const ThemeLayout = ({ size, theme, onTriggered }) => (
  <Item
    size={size}
    text={theme.text}
    textMargin={size === 'small' ? '7px' : '14px'}
    onTriggered={onTriggered}
    focusable
    iconSrc={require('../../examples/images/demoItemIcon.png')}
  />
);

ThemeLayout.propTypes = {
  onTriggered: PropTypes.func,
  size: PropTypes.string,
  theme: PropTypes.object,
};

export default ThemeLayout;
