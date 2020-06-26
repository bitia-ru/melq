import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@/v1/components/Icon/Icon';

const EditButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/edit.svg')}#edit`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    width={17}
    height={16}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

EditButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default EditButtonLayout;
