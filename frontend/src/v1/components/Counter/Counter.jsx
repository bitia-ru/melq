import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CounterLayout from './CounterLayout';

const Counter = ({
  src,
  onClick,
  disabled,
  checked,
  hoverable,
  width,
  height,
  value,
  tooltipText,
  tooltipSide,
  size,
}) => {
  const [counter, setCounter] = useState(0);

  useEffect(
    () => {
      if (!value) {
        setCounter(0);
        return;
      }
      if (value !== counter) {
        setCounter(value);
      }
    },
    [value],
  );

  const onMouseClick = (e) => {
    if (disabled) {
      return;
    }
    onClick(e);
  };

  const onKeyPressed = (e) => {
    if (disabled) {
      return;
    }
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  };

  return (
    <CounterLayout
      src={src}
      onClick={onClick ? onMouseClick : null}
      onKeyDown={onClick ? onKeyPressed : null}
      disabled={disabled}
      checked={checked}
      hoverable={hoverable}
      width={width}
      height={height}
      value={counter}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
      size={size}
    />
  );
};

Counter.defaultProps = {
  disabled: false,
  checked: false,
  hoverable: true,
};

Counter.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  hoverable: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  size: PropTypes.string,
};

export default Counter;
