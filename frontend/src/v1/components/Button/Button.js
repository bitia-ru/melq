import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  disabled,
  isWaiting,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!!disabled}
    /* eslint-disable no-nested-ternary */
    style={disabled ? { cursor: 'not-allowed' } : (isWaiting ? { cursor: 'wait' } : {})}
    /* eslint-disable no-nested-ternary */
  >
    {children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object,
};

Button.defaultProps = {
  disabled: false,
  isWaiting: false,
};

export default Button;
