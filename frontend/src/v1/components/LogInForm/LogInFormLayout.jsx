import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles } from '@/v1/theme';
import Input from '@/v1/components/Input/Input';
import { required, email } from '@/v1/utils/validation';
import Error from '@/v1/components/Error/Error';
import Button from '@/v1/components/Button/Button';

const styles = StyleSheet.create({
  container: { width: 336 },
  errorBlockContainer: { marginTop: 32 },
  bntContainer: { marginTop: 15 },
  fieldContainer: { marginTop: 19 },
});

const getFirstError = (errors, externalErrors) => {
  if (R.keys(errors).length > 0) {
    return `${R.keys(errors)[0]}: ${R.values(errors)[0]}`;
  }
  return `${R.keys(externalErrors)[0]}: ${R.values(externalErrors)[0]}`;
};

const LogInFormLayout = ({
  handleSubmit,
  isWaiting,
  pristine,
  submitting,
  errors,
  errorsVisible,
  externalErrors,
  showErrors,
  hideErrors,
}) => (
  <div className={css(styles.container)}>
    <form onSubmit={handleSubmit}>
      <span className={css(themeStyles.headerFont)}>Войти как администратор</span>
      {
        errorsVisible && (!R.isEmpty(errors) || !R.isEmpty(externalErrors)) && (
          <div className={css(styles.errorBlockContainer)}>
            <Error message={getFirstError(errors, externalErrors)} />
          </div>
        )
      }
      <div className={css(styles.fieldContainer)}>
        <Field
          name="email"
          type="text"
          component={Input}
          label="Email"
          onChange={hideErrors}
          errorsVisible={errorsVisible}
          externalErrors={
            typeof externalErrors.email === 'object'
              ? externalErrors.email.join(', ')
              : externalErrors.email
          }
          validate={[required, email]}
        />
      </div>
      <div className={css(styles.fieldContainer)}>
        <Field
          name="password"
          type="password"
          component={Input}
          label="Пароль"
          onChange={hideErrors}
          errorsVisible={errorsVisible}
          externalErrors={
            typeof externalErrors.password_digest === 'object'
              ? externalErrors.password_digest.join(', ')
              : externalErrors.password_digest
          }
          validate={[required]}
        />
      </div>
      <div className={css(styles.bntContainer)}>
        <Button
          type="submit"
          btnStyle="info"
          isWaiting={isWaiting}
          disabled={pristine || submitting}
          onClick={() => showErrors(errors)}
        >
          Войти
        </Button>
      </div>
    </form>
  </div>
);

LogInFormLayout.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  errorsVisible: PropTypes.bool,
  showErrors: PropTypes.func,
  hideErrors: PropTypes.func,
  externalErrors: PropTypes.object,
  isWaiting: PropTypes.bool,
};

const LogInReduxForm = reduxForm({ form: 'logIn' })(LogInFormLayout);

export default connect(
  state => ({ errors: getFormSyncErrors('logIn')(state) }),
)(LogInReduxForm);
