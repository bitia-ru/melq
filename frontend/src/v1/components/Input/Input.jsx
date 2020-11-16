import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLayout from './InputLayout';

const Input = ({
  input,
  label,
  placeholder,
  errorsVisible,
  externalErrors,
  type,
  meta,
  maxLength,
  items,
  tooltipText,
  tooltipSide,
  disabled,
  size,
  fontSize,
}) => {
  const [inputRef, setInputRef] = useState(undefined);
  const [listRef, setListRef] = useState(undefined);
  const [showDropdownList, setShowDropdownList] = useState(false);

  const onItemTriggered = (item) => {
    input.onChange(item);
    setShowDropdownList(false);
  };

  const onFocus = () => {
    if (items) {
      if (!showDropdownList) {
        inputRef.focus();
      }
      setShowDropdownList(true);
    } else {
      inputRef.focus();
    }
  };

  const onBlur = () => {
    setShowDropdownList(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 40) {
      listRef.focus();
    }
  };

  return (
    <InputLayout
      input={input}
      label={label}
      placeholder={placeholder}
      errorsVisible={errorsVisible}
      externalErrors={externalErrors}
      type={type}
      meta={meta || {}}
      maxLength={maxLength}
      items={items}
      setListRef={setListRef}
      setInputRef={setInputRef}
      onItemTriggered={onItemTriggered}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      showDropdownList={showDropdownList}
      tooltipSide={tooltipSide}
      tooltipText={tooltipText}
      disabled={disabled}
      size={size}
      fontSize={fontSize}
    />
  );
};

Input.propTypes = {
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
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Input;
