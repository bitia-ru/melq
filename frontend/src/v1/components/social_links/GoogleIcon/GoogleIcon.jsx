import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from '@/v1/components/SocialLink/SocialLink';

const GoogleIcon = ({
  tooltipText,
  tooltipSide,
  disabled,
  onTriggered,
}) => (
  <SocialLink
    icon={`${require('./assets/google.svg')}`}
    disabledIcon={`${require('./assets/google_disabled.svg')}`}
    onTriggered={onTriggered}
    disabled={disabled}
    tooltipSide={tooltipSide}
    tooltipText={tooltipText}
  />
);

GoogleIcon.propTypes = {
  disabled: PropTypes.bool,
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default GoogleIcon;
