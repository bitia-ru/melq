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
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';

const styles = StyleSheet.create({
  container: {
    outlineOffset: 1,
    cursor: 'not-allowed',
  },
  label: {
    color: defaultColor,
    marginBottom: 5,
  },
  disabledLabel: { color: disabledColor },
  textarea: {
    resize: 'none',
    height: 72,
    outline: 'none',
    paddingLeft: 20,
    paddingTop: 18,
    border: `1px solid ${focusBorderColor}`,
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    color: mainFontColor,
    ':focus': { backgroundColor: focusBgColor },
  },
  disabledTextArea: {
    border: `1px solid ${disabledColor}`,
    backgroundColor: bgColor,
    color: disabledColor,
    cursor: 'not-allowed',
    '::placeholder': { color: disabledColor },
  },
  textareaError: { border: `1px solid ${errorColor}` },
  textareaContainer: { position: 'relative', width: '100%' },
  counter: {
    position: 'absolute',
    right: 6,
    bottom: 8,
    color: defaultColor,
  },
  disabledCounter: { color: disabledColor },
});

const TextAreaLayout = ({
  input,
  label,
  placeholder,
  errorsVisible,
  type,
  meta: { touched, error, warning },
  maxLength,
  externalErrors,
  tooltipText,
  tooltipSide,
  onFocus,
  setTextAreaRef,
  disabled,
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
          <div className={css(styles.textareaContainer)}>
            <textarea
              {...input}
              ref={setTextAreaRef}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              className={
                css(
                  themeStyles.smallFont,
                  themeStyles.bordered,
                  styles.textarea,
                  errorsVisible && hasErrorOrWarnings && styles.textareaError,
                  disabled && styles.disabledTextArea,
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
      </div>
    </div>
  );
};

TextAreaLayout.propTypes = {
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
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onFocus: PropTypes.func,
  setTextAreaRef: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextAreaLayout;
