import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchLayout from './SearchLayout';

const Search = ({
  text,
  variants,
  disabled,
  onChange,
  tooltipText,
  tooltipSide,
  submit,
}) => {
  const [focused, setFocused] = useState(false);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setFocused(false);
      e.target.blur();
      submit();
    }
  };

  return (
    <SearchLayout
      text={text}
      disabled={disabled}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={onKeyDown}
      focused={focused}
      variants={variants}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
    />
  );
};

Search.propTypes = {
  disabled: PropTypes.bool,
  variants: PropTypes.array,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
  submit: PropTypes.func,
};

export default Search;
