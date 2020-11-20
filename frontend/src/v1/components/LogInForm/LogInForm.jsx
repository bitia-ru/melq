import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import LogInFormLayout from './LogInFormLayout';

const LogInForm = ({ onSubmit, externalErrors, isWaiting }) => {
  const [errorsVisible, setErrorsVisible] = useState(false);

  const showErrors = (errors) => {
    if (R.keys(errors).length === 0 && R.keys(externalErrors).length === 0) {
      return;
    }
    setErrorsVisible(true);
  };

  return (
    <LogInFormLayout
      onSubmit={fields => onSubmit(fields, showErrors)}
      isWaiting={isWaiting}
      errorsVisible={errorsVisible}
      externalErrors={externalErrors}
      showErrors={showErrors}
      hideErrors={() => setErrorsVisible(false)}
    />
  );
};

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
  externalErrors: PropTypes.object,
  isWaiting: PropTypes.bool,
};

LogInForm.defaultProps = { externalErrors: {} };

export default LogInForm;
