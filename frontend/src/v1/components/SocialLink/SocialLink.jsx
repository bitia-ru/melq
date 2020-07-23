import React from 'react';
import PropTypes from 'prop-types';
import SocialLinkLayout from './SocialLinkLayout';

const SocialLink = ({
  tooltipText,
  tooltipSide,
  icon,
  disabledIcon,
  disabled,
  onTriggered,
}) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onTriggered && onTriggered();
    }
  };

  return (
    <SocialLinkLayout
      icon={icon}
      disabledIcon={disabledIcon}
      onClick={onTriggered}
      onKeyDown={onKeyDown}
      disabled={disabled}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
    />
  );
}

SocialLink.propTypes = {
  icon: PropTypes.string,
  disabledIcon: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onTriggered: PropTypes.func,
};

export default SocialLink;
