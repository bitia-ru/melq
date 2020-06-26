import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../../../aphrodite';
import { errorColor, defaultColor } from '@/v1/theme';
import Icon from '@/v1/components/Icon/Icon';

const styles = StyleSheet.create({
  trashIcon: {
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      '> svg': {
        fill: defaultColor,
        stroke: defaultColor,
        transform: 'scale(1.12)',
      },
    },
    ':active': {
      '> svg': {
        fill: errorColor,
        stroke: errorColor,
        transform: 'scale(1.12)',
      },
    },
  },
  iconActiveStyle: {
    '> svg': {
      fill: errorColor,
      stroke: errorColor,
      transform: 'scale(1.12)',
    },
  },
});

const TrashButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/trash.svg')}#trash`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    iconStyle={styles.trashIcon}
    iconActiveStyle={styles.iconActiveStyle}
    width={16}
    height={16}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

TrashButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default TrashButtonLayout;
