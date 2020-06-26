import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../../../aphrodite';
import { errorColor, bgColor } from '@/v1/theme';
import Icon from '@/v1/components/Icon/Icon';

const styles = StyleSheet.create({
  smallCloseIcon: {
    width: 17,
    height: 17,
    backgroundColor: errorColor,
    '> svg': {
      fill: bgColor,
      stroke: bgColor,
    },
    ':hover': {
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
        transform: 'scale(1.4)',
      },
    },
    ':active': {
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
        transform: 'scale(1)',
      },
    },
  },
  iconActiveStyle: {
    '> svg': {
      fill: bgColor,
      stroke: bgColor,
      transform: 'scale(1)',
    },
  },
});

const SmallCloseButtonLayout = ({ onTriggered, tooltipText, tooltipSide }) => (
  <Icon
    src={`${require('./images/small_close.svg')}#small_close`}
    onTriggered={onTriggered}
    iconStyle={styles.smallCloseIcon}
    iconActiveStyle={styles.iconActiveStyle}
    width={7}
    height={7}
    smallBorderRadius
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

SmallCloseButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default SmallCloseButtonLayout;
