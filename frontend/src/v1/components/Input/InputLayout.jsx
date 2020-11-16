import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyleSheet, css } from '../../aphrodite';
import {
  mainFontColor,
  themeStyles,
  defaultColor,
  focusBorderColor,
  focusBgColor,
  errorColor,
  disabledColor,
  bgColor,
} from '@/v1/theme';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import List from '@/v1/components/List/List';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';

const styles = StyleSheet.create({
  container: {
    outlineOffset: 1,
    position: 'relative',
    width: '100%',
  },
  label: {
    color: defaultColor,
    marginBottom: 5,
  },
  disabledLabel: { color: disabledColor },
  input: {
    height: 48,
    outline: 'none',
    paddingLeft: 30,
    border: `1px solid ${focusBorderColor}`,
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    color: mainFontColor,
    ':focus': { backgroundColor: focusBgColor },
    '::placeholder': { color: defaultColor },
  },
  inputSmall: { height: 44 },
  inputLarge: { height: 50 },
  inputSmallPadding: { paddingLeft: 20 },
  disabledInput: {
    border: `1px solid ${disabledColor}`,
    backgroundColor: bgColor,
    color: disabledColor,
    cursor: 'not-allowed',
    '::placeholder': { color: disabledColor },
  },
  inputError: { border: `1px solid ${errorColor}` },
  inputContainer: { position: 'relative', width: '100%' },
  counter: {
    position: 'absolute',
    right: 6,
    bottom: 8,
    color: defaultColor,
  },
  disabledCounter: { color: disabledColor },
  listContainer: {
    paddingTop: 8,
    zIndex: 100,
    position: 'absolute',
    width: '100%',
  },
});

const InputLayout = ({
  input,
  label,
  placeholder,
  errorsVisible,
  type,
  meta: { touched, error, warning },
  maxLength,
  externalErrors,
  items,
  onItemTriggered,
  showDropdownList,
  onFocus,
  onBlur,
  onKeyDown,
  setListRef,
  setInputRef,
  tooltipText,
  tooltipSide,
  disabled,
  size,
  fontSize,
}) => {
  const hasErrorOrWarnings = (touched && (error || warning)) || externalErrors;

  const getErrorAndWarningList = () => {
    if (!hasErrorOrWarnings) {
      return [];
    }
    let list = [];
    if (touched && error) {
      list = R.append(error, list);
    }
    if (touched && warning) {
      list = R.append(warning, list);
    }
    if (externalErrors) {
      list = R.append(externalErrors, list);
    }
    return R.flatten(list);
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={css(styles.container, themeStyles.focusableParent)}
      onFocus={disabled ? null : onFocus}
      onBlur={showDropdownList ? onBlur : null}
      onKeyDown={showDropdownList ? onKeyDown : null}
    >
      {
        label && (
          <span
            className={
              css(
                themeStyles.defaultFont,
                styles.label,
                disabled && styles.disabledLabel,
              )
            }
          >
            {label}
          </span>
        )
      }
      <div>
        <ConditionalWrapper
          condition={(errorsVisible && hasErrorOrWarnings) || tooltipText}
          wrapper={
            content => (
              <Tooltip
                tooltipText={
                  errorsVisible && hasErrorOrWarnings
                    ? R.join(', ', getErrorAndWarningList())
                    : tooltipText
                }
                tooltipSide={
                  errorsVisible && hasErrorOrWarnings
                    ? 'right'
                    : tooltipSide
                }
                isShowing={!!(errorsVisible && hasErrorOrWarnings)}
              >
                {content}
              </Tooltip>
            )
          }
        >
          <div className={css(styles.inputContainer)}>
            <input
              {...input}
              ref={setInputRef}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              className={
                css(
                  themeStyles.defaultFont,
                  themeStyles.bordered,
                  styles.input,
                  size === 'small' && styles.inputSmall,
                  size === 'large' && styles.inputLarge,
                  fontSize === 'small' && themeStyles.smallFont,
                  fontSize === 'small' && styles.inputSmallPadding,
                  errorsVisible && hasErrorOrWarnings && styles.inputError,
                  disabled && styles.disabledInput,
                )
              }
            />
            {
              maxLength && (
                <span
                  className={
                    css(
                      themeStyles.defaultFont,
                      styles.counter,
                      disabled && styles.disabledCounter,
                    )
                  }
                >
                  {input.value ? (maxLength - input.value.length) : maxLength}
                </span>
              )
            }
          </div>
        </ConditionalWrapper>
        {
          showDropdownList && (
            <div className={css(styles.listContainer)}>
              <List items={items} onItemTriggered={onItemTriggered} setRef={setListRef} />
            </div>
          )
        }
      </div>
    </div>
  );
};

InputLayout.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  maxLength: PropTypes.number,
  errorsVisible: PropTypes.bool,
  externalErrors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  items: PropTypes.array,
  onItemTriggered: PropTypes.func,
  showDropdownList: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  setListRef: PropTypes.func,
  setInputRef: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  fontSize: PropTypes.string,
};

export default InputLayout;
