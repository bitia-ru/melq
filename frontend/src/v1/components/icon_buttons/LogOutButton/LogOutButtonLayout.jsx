import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@/v1/components/Icon/Icon';

const LogOutButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/logout.svg')}#logout`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    width={25}
    height={24}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

LogOutButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default LogOutButtonLayout;
