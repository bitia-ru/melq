import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from '@/v1/components/SocialLink/SocialLink';

const InstagramIcon = ({
  tooltipText,
  tooltipSide,
  disabled,
  onTriggered,
}) => (
  <SocialLink
    icon={`${require('./assets/instagram.svg')}`}
    disabledIcon={`${require('./assets/instagram_disabled.svg')}`}
    onTriggered={onTriggered}
    disabled={disabled}
    tooltipSide={tooltipSide}
    tooltipText={tooltipText}
  />
);

InstagramIcon.propTypes = {
  disabled: PropTypes.bool,
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default InstagramIcon;
