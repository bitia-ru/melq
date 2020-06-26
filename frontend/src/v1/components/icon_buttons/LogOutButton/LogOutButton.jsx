import React from 'react';
import PropTypes from 'prop-types';
import LogOutButtonLayout from './LogOutButtonLayout';

const LogOutButton = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <LogOutButtonLayout
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

LogOutButton.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

LogOutButton.defaultProps = { tooltipText: 'Выйти' };

export default LogOutButton;
