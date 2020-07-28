import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles, infoColor, mainFontColor } from '@/v1/theme';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';

const styles = StyleSheet.create({
  link: {
    cursor: 'pointer',
    outline: 'none',
    outlineOffset: 1,
    display: 'inline-block',
  },
  linkBig: {
    fontSize: 16,
    lineHeight: '19px',
  },
  linkDisabled: {
    cursor: 'not-allowed',
    ':active': { fontWeight: 'normal' },
  },
  linkWaiting: { cursor: 'wait' },
  darkLink: {
    backgroundColor: 'transparent',
    color: mainFontColor,
    '> svg': {
      fill: mainFontColor,
      stroke: mainFontColor,
    },
    ':hover': {
      color: infoColor,
      '> svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
    ':active': {
      color: infoColor,
      fontWeight: 'bold',
      '> svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
  },
  iconActive: {
    color: infoColor,
    fontWeight: 'bold',
    '> svg': {
      fill: infoColor,
      stroke: infoColor,
    },
  },
});

const LinkLayout = ({
  disabled,
  isWaiting,
  onClick,
  linkStyle,
  children,
  size,
  onKeyUp,
  onKeyDown,
  active,
  tooltipText,
  tooltipSide,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>
          {content}
        </Tooltip>
      )
    }
  >
    <div
      role="button"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onClick={disabled || isWaiting ? null : onClick}
      tabIndex={0}
      disabled={!!disabled}
      className={
        css(
          styles.link,
          themeStyles.focusable,
          themeStyles.defaultFont,
          themeStyles.fontWeight500,
          themeStyles.transparentColor,
          linkStyle === 'dark' && styles.darkLink,
          size === 'big' && styles.linkBig,
          linkStyle === 'dark' && active && styles.iconActive,
          disabled && styles.linkDisabled,
          isWaiting && styles.linkWaiting,
          (disabled || isWaiting) && themeStyles.transparentColorDisabled,
        )
      }
    >
      {children}
    </div>
  </ConditionalWrapper>
);

LinkLayout.propTypes = {
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  linkStyle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  active: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default LinkLayout;
