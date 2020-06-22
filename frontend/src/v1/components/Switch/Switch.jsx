import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwitchLayout from './SwitchLayout';

const Switch = ({
  id,
  disabled,
  checked,
  onClick,
  name,
  tooltipText,
  tooltipSide,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!checked || checked !== isChecked) {
      setIsChecked(checked);
    }
  }, [checked]);

  const onMouseClick = () => {
    if (disabled) {
      return;
    }
    onClick(isChecked);
  };

  const onKeyPressed = (event) => {
    if (disabled) {
      return;
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
      onClick(isChecked);
    }
  };

  return (
    <SwitchLayout
      id={id}
      disabled={disabled}
      checked={isChecked}
      onMouseClick={onMouseClick}
      onKeyPressed={onKeyPressed}
      name={name}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
    />
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default Switch;
