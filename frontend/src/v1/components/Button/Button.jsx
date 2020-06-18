import React from 'react';
import PropTypes from 'prop-types';
import ButtonLayout from './ButtonLayout';

const Button = ({
  disabled,
  isWaiting,
  onClick,
  btnStyle,
  size,
  type,
  children,
  tooltipText,
  tooltipSide,
}) => (
  <ButtonLayout
    disabled={disabled}
    isWaiting={isWaiting}
    onClick={onClick}
    btnStyle={btnStyle}
    type={type}
    size={size}
    tooltipSide={tooltipSide}
    tooltipText={tooltipText}
  >
    {children}
  </ButtonLayout>
);

Button.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  isWaiting: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  btnStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tooltipText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  tooltipSide: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default Button;
