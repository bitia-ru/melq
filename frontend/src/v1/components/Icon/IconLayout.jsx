import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles, disabledColor, infoColor, defaultColor } from '@/v1/theme';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  icon: {
    display: 'flex',
    outline: 'none',
    outlineOffset: 1,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '> svg': {
      display: 'flex',
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      '>svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
    ':active': {
      '>svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
  },
  iconDisabled: {
    '> svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
    cursor: 'not-allowed',
    transform: 'scale(1)',
    border: 'none',
    ':hover': {
      border: 'none',
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
        transform: 'scale(1)',
      },
    },
    ':active': {
      border: 'none',
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
        transform: 'scale(1)',
      },
    },
  },
  iconWaiting: { cursor: 'wait' },
  iconActive: {
    '>svg': {
      fill: infoColor,
      stroke: infoColor,
    },
  },
});

const IconLayout = ({
  src,
  onClick,
  disabled,
  isWaiting,
  iconStyle,
  iconDisabledStyle,
  iconActiveStyle,
  smallBorderRadius,
  width,
  height,
  tooltipText,
  tooltipSide,
  onKeyUp,
  onKeyDown,
  active,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>{content}</Tooltip>
      )
    }
  >
    <div className={css(styles.container)}>
      <div
        role="button"
        tabIndex={disabled || isWaiting || !onClick ? -1 : 0}
        className={
          css(
            styles.icon,
            themeStyles.focusable,
            smallBorderRadius ? themeStyles.borderedWithSmallRadius : themeStyles.bordered,
            iconStyle,
            active && styles.iconActive,
            active && iconActiveStyle,
            (disabled || isWaiting) && styles.iconDisabled,
            isWaiting && styles.iconWaiting,
            (disabled || isWaiting) && iconDisabledStyle,
          )
        }
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onClick={disabled || isWaiting ? null : onClick}
      >
        <svg width={width} height={height}>
          <use xlinkHref={src} />
        </svg>
      </div>
    </div>
  </ConditionalWrapper>
);

IconLayout.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  iconStyle: PropTypes.object,
  iconDisabledStyle: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  active: PropTypes.bool,
  iconActiveStyle: PropTypes.object,
  smallBorderRadius: PropTypes.bool,
};

export default IconLayout;
