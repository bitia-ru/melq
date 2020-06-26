import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../../../aphrodite';
import { successColor, defaultColor } from '@/v1/theme';
import Icon from '@/v1/components/Icon/Icon';

const styles = StyleSheet.create({
  hideIcon: {
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
        fill: successColor,
        stroke: successColor,
        transform: 'scale(1)',
      },
    },
  },
  hideIconSwitchedOn: {
    '> svg': {
      fill: successColor,
      stroke: successColor,
    },
    ':hover': {
      '> svg': {
        fill: successColor,
        stroke: successColor,
        transform: 'scale(1.12)',
      },
    },
    ':active': {
      '> svg': {
        fill: defaultColor,
        stroke: defaultColor,
        transform: 'scale(1)',
      },
    },
  },
  iconActiveStyle: {
    '> svg': {
      fill: successColor,
      stroke: successColor,
      transform: 'scale(1)',
    },
  },
  iconActiveStyleSwitchedOn: {
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
      transform: 'scale(1)',
    },
  },
});

const HideButtonLayout = ({
  onTriggered,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
  switchedOn,
}) => (
  <Icon
    src={`${require('./images/hide.svg')}#hide`}
    onTriggered={onTriggered}
    disabled={disabled}
    isWaiting={isWaiting}
    iconStyle={switchedOn ? styles.hideIconSwitchedOn : styles.hideIcon}
    iconActiveStyle={switchedOn ? styles.iconActiveStyleSwitchedOn : styles.iconActiveStyle}
    width={18}
    height={17}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

HideButtonLayout.propTypes = {
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  switchedOn: PropTypes.bool,
};

export default HideButtonLayout;
