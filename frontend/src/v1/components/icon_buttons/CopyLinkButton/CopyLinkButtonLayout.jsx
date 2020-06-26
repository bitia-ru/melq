import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../../../aphrodite';
import { disabledColor, btnBgColor, successColor, bgColor } from '@/v1/theme';
import Icon from '@/v1/components/Icon/Icon';

const styles = StyleSheet.create({
  copyLinkIcon: {
    width: 50,
    height: 50,
    backgroundColor: btnBgColor,
    border: `1px solid ${btnBgColor}`,
    '> svg': {
      fill: successColor,
      stroke: successColor,
    },
    ':hover': {
      border: `1px solid ${successColor}`,
      borderColor: successColor,
      '> svg': {
        fill: successColor,
        stroke: successColor,
      },
    },
    ':active': {
      backgroundColor: successColor,
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
      },
    },
  },
  copyLinkIconDisabled: {
    borderStyle: 'none',
    ':hover': {
      borderStyle: 'none',
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':active': {
      borderStyle: 'none',
      backgroundColor: btnBgColor,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
  },
  iconActiveStyle: {
    backgroundColor: successColor,
    '> svg': {
      fill: bgColor,
      stroke: bgColor,
    },
  },
});

const CopyLinkButtonLayout = ({
  onClick,
  disabled,
  isWaiting,
  tooltipText,
  tooltipSide,
}) => (
  <Icon
    src={`${require('./images/copy_link.svg')}#copy_link`}
    onClick={onClick}
    disabled={disabled}
    isWaiting={isWaiting}
    iconStyle={styles.copyLinkIcon}
    iconDisabledStyle={styles.copyLinkIconDisabled}
    iconActiveStyle={styles.iconActiveStyle}
    width={24}
    height={24}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
  />
);

CopyLinkButtonLayout.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default CopyLinkButtonLayout;
