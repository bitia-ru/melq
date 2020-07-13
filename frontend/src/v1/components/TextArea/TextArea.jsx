import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextAreaLayout from './TextAreaLayout';

const TextArea = ({
  input,
  label,
  placeholder,
  errorsVisible,
  externalErrors,
  type,
  meta,
  maxLength,
  tooltipText,
  tooltipSide,
  disabled,
}) => {
  const [textareaRef, setTextAreaRef] = useState(undefined);

  const onFocus = () => {
    textareaRef.focus();
  };

  return (
    <TextAreaLayout
      input={input}
      label={label}
      placeholder={placeholder}
      errorsVisible={errorsVisible}
      externalErrors={externalErrors}
      type={type}
      meta={meta || {}}
      maxLength={maxLength}
      tooltipSide={tooltipSide}
      tooltipText={tooltipText}
      onFocus={onFocus}
      setTextAreaRef={setTextAreaRef}
      disabled={disabled}
    />
  );
};

TextArea.propTypes = {
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
  disabled: PropTypes.bool,
};

export default TextArea;
