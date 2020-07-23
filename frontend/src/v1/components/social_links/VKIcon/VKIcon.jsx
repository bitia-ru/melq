import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from '@/v1/components/SocialLink/SocialLink';

const VKIcon = ({
  tooltipText,
  tooltipSide,
  disabled,
  onTriggered,
}) => (
  <SocialLink
    icon={`${require('./assets/vk.svg')}`}
    disabledIcon={`${require('./assets/vk_disabled.svg')}`}
    onTriggered={onTriggered}
    disabled={disabled}
    tooltipSide={tooltipSide}
    tooltipText={tooltipText}
  />
);

VKIcon.propTypes = {
  disabled: PropTypes.bool,
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default VKIcon;
