import React from 'react';
import PropTypes from 'prop-types';
import TrashButtonLayout from './TrashButtonLayout';

const TrashButton = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <TrashButtonLayout
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

TrashButton.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

TrashButton.defaultProps = { tooltipText: 'Удалить' };

export default TrashButton;
