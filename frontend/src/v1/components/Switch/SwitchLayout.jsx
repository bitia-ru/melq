import React from 'react';
import PropTypes from 'prop-types';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import Tooltip from '../Tooltip/Tooltip';
import { StyleSheet, css } from '../../aphrodite';
import {
  btnBgColor,
  defaultColor,
  disabledColor,
  separatorColor,
  successColor,
  themeStyles,
} from '../../theme';

const styles = StyleSheet.create({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '64px',
    height: '32px',
    background: separatorColor,
    borderRadius: '30px',
    cursor: 'pointer',
    outlineOffset: '2px',
    ':hover': { '>span': { visibility: 'visible' } },
  },
  switch: {
    position: 'relative',
    left: '3.12%',
    right: '53.12%',
    top: '6.25%',
    bottom: '6.25%',
    width: '28px',
    height: '28px',
    borderRadius: '30px',
    background: defaultColor,
    transitionDuration: '300ms',
  },
  checked: {
    left: '53.12%',
    right: '3.12%',
    top: '6.25%',
    bottom: '6.25%',
    width: '28px',
    height: '28px',
    background: successColor,
    transitionDuration: '300ms',
  },
  disabled: {
    background: btnBgColor,
    '>div': { background: disabledColor },
    outline: 'none',
    cursor: 'not-allowed',
    ':focus': { outline: 'none' },
  },
});

const SwitchLayout = ({
  id,
  disabled,
  checked,
  onMouseClick,
  onKeyPressed,
  name,
  tooltipText,
  tooltipSide,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>{content}</Tooltip>
      )
    }
  >
    <div
      className={css(styles.wrapper, disabled && styles.disabled, themeStyles.focusable)}
      onClick={onMouseClick}
      onKeyDown={onKeyPressed}
      role="radio"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={css(styles.switch, checked && styles.checked)} />
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        name={name}
        id={id}
        hidden
      />
    </div>
  </ConditionalWrapper>
);

SwitchLayout.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onMouseClick: PropTypes.func,
  onKeyPressed: PropTypes.func,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default SwitchLayout;
