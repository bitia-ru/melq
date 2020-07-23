import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from '@/v1/components/SocialLink/SocialLink';

const FacebookIcon = ({
  tooltipText,
  tooltipSide,
  disabled,
  onTriggered,
}) => (
  <SocialLink
    icon={`${require('./assets/facebook.svg')}`}
    disabledIcon={`${require('./assets/facebook_disabled.svg')}`}
    onTriggered={onTriggered}
    disabled={disabled}
    tooltipSide={tooltipSide}
    tooltipText={tooltipText}
  />
);

FacebookIcon.propTypes = {
  disabled: PropTypes.bool,
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default FacebookIcon;
