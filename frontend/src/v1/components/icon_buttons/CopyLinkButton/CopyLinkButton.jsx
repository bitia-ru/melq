import React from 'react';
import PropTypes from 'prop-types';
import CopyLinkButtonLayout from './CopyLinkButtonLayout';

const CopyLinkButton = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <CopyLinkButtonLayout
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

CopyLinkButton.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

CopyLinkButton.defaultProps = { tooltipText: 'Копировать' };

export default CopyLinkButton;
