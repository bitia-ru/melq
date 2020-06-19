import React from 'react';
import PropTypes from 'prop-types';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import Tooltip from '../Tooltip/Tooltip';
import { StyleSheet, css } from '../../aphrodite';
import {
  bgColor,
  disabledColor,
  separatorColor,
  successColor,
  themeStyles,
} from '../../theme';

const defaultCheck = `${require('./assets/check.svg')}`;
const smallCheck = `${require('./assets/check_small.svg')}`;
const defaultDisabledCheck = `${require('./assets/check_disabled.svg')}`;
const smallDisabledCheck = `${require('./assets/check_small_disabled.svg')}`;

const styles = StyleSheet.create({
  checkbox: {
    background: separatorColor,
    outlineOffset: '2px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: successColor,
      '>span': { visibility: 'visible' },
    },
  },
  disabled: {
    background: bgColor,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: `1px solid ${disabledColor}`,
    outline: 'none',
    cursor: 'not-allowed',
    ':focus': { outline: 'none' },
    ':hover': { backgroundColor: bgColor },
  },
  default: {
    width: '24px',
    height: '24px',
  },
  small: {
    width: '16px',
    height: '16px',
  },
  active: {
    background: successColor,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  defaultActive: { backgroundImage: `url('${defaultCheck}')` },
  smallActive: { backgroundImage: `url('${smallCheck}')` },
  defaultDisabled: { backgroundImage: `url('${defaultDisabledCheck}')` },
  smallDisabled: { backgroundImage: `url('${smallDisabledCheck}')` },
});

const CheckBoxLayout = ({
  id,
  checked,
  disabled,
  onMouseClick,
  onKeyPressed,
  name,
  size,
  tooltipText,
  tooltipSide,
}) => (
  <div className={css(styles.wrapper)}>
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
        className={css(
          styles.checkbox,
          themeStyles.focusable,
          checked && styles.active,
          checked && (size === 'small' ? styles.smallActive : styles.defaultActive),
          disabled && styles.disabled,
          disabled && checked && (size === 'small' ? styles.smallDisabled : styles.defaultDisabled),
          size === 'small' ? styles.small : styles.default,
          size === 'small' ? themeStyles.borderedWithSmallRadius : themeStyles.bordered,
        )}
        onClick={onMouseClick}
        onKeyDown={onKeyPressed}
        role="checkbox"
        aria-checked={checked}
        tabIndex="0"
      >
        <input
          type="checkbox"
          value={checked}
          disabled={disabled}
          name={name}
          id={id}
          hidden
        />
      </div>
    </ConditionalWrapper>
  </div>
);

CheckBoxLayout.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onMouseClick: PropTypes.func,
  onKeyPressed: PropTypes.func,
  name: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default CheckBoxLayout;
