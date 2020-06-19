import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBoxLayout from './CheckBoxLayout';

const CheckBox = ({
  id,
  checked,
  disabled,
  onClick,
  name,
  size,
  tooltipText,
  tooltipSide,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!checked || checked !== isChecked) {
      setIsChecked(checked);
    }
  }, [checked]);

  const onKeyPressed = (event) => {
    if (disabled) {
      return;
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
      onClick(isChecked);
    }
  };

  const onMouseClick = () => {
    if (disabled) {
      return;
    }
    onClick(isChecked);
  };

  return (
    <CheckBoxLayout
      id={id}
      checked={isChecked}
      disabled={disabled}
      onMouseClick={onMouseClick}
      onKeyPressed={onKeyPressed}
      name={name}
      size={size}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
    />
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default CheckBox;
