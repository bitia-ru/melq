import React from 'react';
import PropTypes from 'prop-types';
import ErrorLayout from './ErrorLayout';

const Error = ({ message }) => (
  <ErrorLayout message={message} />
);

Error.propTypes = { message: PropTypes.string };

export default Error;
