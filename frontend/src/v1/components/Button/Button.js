import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const Button = ({
  disabled,
  isWaiting,
  onClick,
  children
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!!disabled}
      style={disabled ? { cursor: 'not-allowed' } : (isWaiting ? { cursor: 'wait' } : {})}
    >
      {children}
    </button>
  );
};

const styles = StyleSheet.create({
});

Button.propTypes = {
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
  isWaiting: false,
};

export default Button;
