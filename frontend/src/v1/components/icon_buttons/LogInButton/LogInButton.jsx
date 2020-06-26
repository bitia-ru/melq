import React from 'react';
import PropTypes from 'prop-types';
import LogInButtonLayout from './LogInButtonLayout';

const LogInButton = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <LogInButtonLayout
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

LogInButton.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

LogInButton.defaultProps = { tooltipText: 'Войти' };

export default LogInButton;
