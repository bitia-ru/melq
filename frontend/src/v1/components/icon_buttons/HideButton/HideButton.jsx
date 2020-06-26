import React from 'react';
import PropTypes from 'prop-types';
import HideButtonLayout from './HideButtonLayout';

const HideButton = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
  switchedOn,
}) => (
  <HideButtonLayout
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    tooltipText={tooltipText || (switchedOn ? 'Скрыть' : 'Показать')}
    tooltipSide={tooltipSide}
    switchedOn={switchedOn}
  />
);

HideButton.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  switchedOn: PropTypes.bool,
};

export default HideButton;
