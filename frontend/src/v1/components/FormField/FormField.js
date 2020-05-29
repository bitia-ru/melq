import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormField extends Component {
    onKeyPress = (event) => {
      const { onEnter } = this.props;
      if (event.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    render() {
      const {
        hasError, id, disabled, type, value, onChange, placeholder, errorText, onBlur,
      } = this.props;
      return (
        <div>
          <span>
            <input
              id={id}
              disabled={!!disabled}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onKeyPress={this.onKeyPress}
              placeholder={placeholder}
            />
          </span>
          {
            hasError
              ? (
                <div>
                  {errorText}
                </div>
              )
              : ''
          }
        </div>
      );
    }
}

FormField.propTypes = {
  onEnter: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  hasError: PropTypes.array,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

FormField.defaultProps = {
  onEnter: null,
  hasError: null,
  disabled: false,
  onChange: null,
  onBlur: null,
  errorText: null,
};
