import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@/v1/components/Icon/Icon';

const LogInButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/login.svg')}#login`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    width={24}
    height={24}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

LogInButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default LogInButtonLayout;
