import React from 'react';
import PropTypes from 'prop-types';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import Tooltip from '../Tooltip/Tooltip';
import { StyleSheet, css } from '../../aphrodite';
import {
  dateTopicCounterColor,
  hoveredInfoColor,
  disabledColor,
  themeStyles,
} from '@/v1/theme';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  counterIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    outlineOffset: '2px',
  },
  counter: {
    fill: dateTopicCounterColor,
    color: dateTopicCounterColor,
    ':hover': { cursor: 'pointer' },
  },
  counterIsScalable: { ':hover': { '> svg': { transform: 'scale(1.2)' } } },
  counterChecked: {
    color: hoveredInfoColor,
    '> svg': {
      fill: hoveredInfoColor,
      transform: 'scale(1)',
    },
    ':hover': { cursor: 'pointer' },
  },
  counterDisabled: {
    '> svg': { fill: disabledColor },
    color: disabledColor,
    transform: 'scale(1)',
    outline: 'none',
    ':hover': {
      cursor: 'not-allowed',
      '> svg': {
        fill: disabledColor,
        transform: 'scale(1)',
      },
    },
    ':checked': { '> svg': { fill: disabledColor, transform: 'scale(1)' } },
    ':focus': { outline: 'none' },
  },
  counterValue: { minWidth: '10px' },
  counterValueDefaultMargin: { margin: '0px 8px' },
  counterValueSmallMargin: { margin: '0px 5px' },
});

const CounterLayout = ({
  src,
  onClick,
  onKeyDown,
  disabled,
  checked,
  hoverable,
  width,
  height,
  value,
  tooltipText,
  tooltipSide,
  size,
}) => {
  const getScaledSize = (sizeType) => {
    if (size === 'small') {
      return sizeType * 0.7;
    }
    return sizeType;
  };

  return (
    <ConditionalWrapper
      condition={tooltipText}
      wrapper={
        content => (
          <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>{content}</Tooltip>
        )
      }
    >
      <div className={css(styles.wrapper)}>
        <div
          className={
            css(
              styles.counterIcon,
              themeStyles.focusable,
              !checked && styles.counter,
              checked && styles.counterChecked,
              hoverable && styles.counterIsScalable,
              disabled && styles.counterDisabled,
            )}
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          <svg width={getScaledSize(width)} height={getScaledSize(height)}>
            <use xlinkHref={src} />
          </svg>
          <span
            className={
              css(
                styles.counterValue,
                size === 'small'
                  ? styles.counterValueSmallMargin
                  : styles.counterValueDefaultMargin,
                themeStyles.defaultFont,
              )
            }
          >
            {value === 0 ? null : value}
          </span>
        </div>
      </div>
    </ConditionalWrapper>
  );
};

CounterLayout.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  hoverable: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  size: PropTypes.string,
};

export default CounterLayout;
