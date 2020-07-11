import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { mainFontColor, selectedItemColor, themeStyles, disabledColor } from '@/v1/theme';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    outlineOffset: 1,
    maxWidth: '100%',
    ':focus': { outline: 'none' },
  },
  focusable: { cursor: 'pointer' },
  hoverable: { ':hover': { backgroundColor: selectedItemColor } },
  itemDisabled: { cursor: 'not-allowed' },
  img: {
    width: 40,
    height: 40,
    minWidth: 40,
    backgroundSize: 'cover',
  },
  smallImg: {
    width: 26,
    height: 26,
    minWidth: 26,
  },
  text: {
    marginLeft: 14,
    color: mainFontColor,
    textOverflow: 'ellipsis',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'start',
  },
  itemTextDisabled: { color: disabledColor },
  smallText: { marginLeft: 8 },
});

const ItemLayout = ({
  text,
  iconSrc,
  tooltipText,
  tooltipSide,
  hoverable,
  focusable,
  disabled,
  size,
  width,
  height,
  textMargin,
  itemHoverStyle,
  onClick,
  onKeyUp,
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
      className={
        css(
          styles.container,
          hoverable && styles.hoverable,
          hoverable && !disabled && itemHoverStyle,
          focusable && themeStyles.focusable,
          focusable && styles.focusable,
          disabled && styles.itemDisabled,
        )
      }
      role="button"
      onClick={disabled ? null : onClick}
      onKeyUp={disabled ? null : onKeyUp}
      tabIndex={focusable && !disabled ? 0 : -1}
    >
      <div
        className={css(styles.img, size === 'small' && styles.smallImg)}
        style={{ backgroundImage: `url(${iconSrc})`, width, height, minWidth: width }}
      />
      <span
        className={
          css(
            styles.text,
            size === 'small' && styles.smallText,
            themeStyles.mediumFont,
            size === 'small' && themeStyles.smallFont,
            disabled && styles.itemTextDisabled,
          )
        }
        style={{ marginLeft: textMargin }}
      >
        {text}
      </span>
    </div>
  </ConditionalWrapper>
);

ItemLayout.propTypes = {
  text: PropTypes.string,
  iconSrc: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  hoverable: PropTypes.bool,
  focusable: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.string,
  textMargin: PropTypes.number,
  itemHoverStyle: PropTypes.object,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
};

export default ItemLayout;
