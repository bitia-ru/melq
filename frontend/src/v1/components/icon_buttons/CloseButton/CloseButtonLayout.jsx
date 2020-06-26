import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../../../aphrodite';
import { errorColor, defaultColor } from '@/v1/theme';
import Icon from '@/v1/components/Icon/Icon';

const styles = StyleSheet.create({
  closeIcon: {
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      '> svg': {
        fill: errorColor,
        stroke: errorColor,
      },
    },
    ':active': {
      '> svg': {
        fill: defaultColor,
        stroke: defaultColor,
      },
    },
  },
  iconActiveStyle: {
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
  },
});

const CloseButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/close.svg')}#close`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    iconStyle={styles.closeIcon}
    iconActiveStyle={styles.iconActiveStyle}
    width={18}
    height={17}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

CloseButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default CloseButtonLayout;
