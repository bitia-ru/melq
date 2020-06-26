import React from 'react';
import PropTypes from 'prop-types';
import SmallCloseButtonLayout from './SmallCloseButtonLayout';

const SmallCloseButton = ({ onTriggered, tooltipText, tooltipSide }) => (
  <SmallCloseButtonLayout
    onTriggered={onTriggered}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

SmallCloseButton.propTypes = {
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

SmallCloseButton.defaultProps = { tooltipText: 'Удалить' };

export default SmallCloseButton;
