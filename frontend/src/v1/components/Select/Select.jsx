import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectLayout from './SelectLayout';

const Select = ({
  input,
  label,
  placeholder,
  items,
  tooltipText,
  tooltipSide,
  disabled,
  multiple,
}) => {
  let listFocused;
  const [itemSelected, setItemSelected] = useState(false);
  const [listRef, setListRef] = useState(undefined);
  const [showDropdownList, setShowDropdownList] = useState(false);

  const onItemTriggered = (item) => {
    if (!multiple) {
      setShowDropdownList(false);
    } else {
      setItemSelected(true);
    }
    input.onChange(item);
  };

  const onClick = () => {
    setShowDropdownList(!showDropdownList);
  };

  const onBlur = () => {
    if (!listFocused && !itemSelected) {
      setShowDropdownList(false);
    }
    listRef && listRef.focus();
    setItemSelected(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (!listFocused && !itemSelected) {
        setShowDropdownList(!showDropdownList);
      }
      listRef && listRef.focus();
      setItemSelected(false);
    }
    if (e.keyCode === 40) {
      listFocused = true;
      listRef.focus();
    }
  };

  return (
    <SelectLayout
      input={input}
      label={label}
      placeholder={placeholder}
      items={items}
      multiple={multiple}
      setListRef={setListRef}
      onItemTriggered={onItemTriggered}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      showDropdownList={showDropdownList}
      tooltipSide={tooltipSide}
      tooltipText={tooltipText}
      disabled={disabled}
    />
  );
};

Select.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  items: PropTypes.array,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default Select;
