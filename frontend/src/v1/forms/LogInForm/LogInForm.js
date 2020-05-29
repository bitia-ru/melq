import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Button from '@/v1/components/Button/Button';
import FormField from '@/v1/components/FormField/FormField';
import { reEmail } from '@/v1/Constants/Constraints';
import Modal from '../../layouts/Modal';
import { createUserSession } from '../../utils/auth';

import { ModalContext } from '../../modules/modalable';

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      passwordEnter: '',
      email: '',
      password: '',
      errors: {},
      isWaiting: false,
    };
  }

  resetErrors = () => {
    this.setState({ errors: {} });
  };

  onEmailChange = (event) => {
    this.resetErrors();
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.resetErrors();
    this.setState({ password: event.target.value });
    this.check('password', event.target.value);
  };

  check = (field, value) => {
    const { errors } = this.state;
    switch (field) {
    case 'password':
      if (value.length === 0) {
        this.setState(
          {
            errors: R.merge(
              errors,
              { password_digest: ['Пароль не может быть пустым'] },
            ),
          },
        );
        return false;
      }
      return true;
    default:
      return true;
    }
  };

  checkAndSubmit = (data, passwordNew, after) => {
    const { password, rememberMe } = this.state;
    const res = !this.check('password', password);
    if (res > 0) {
      return;
    }
    this.onFormSubmit(data, passwordNew, rememberMe, after);
  };

  onFormSubmit = (data, password, longDuration, after) => {
    const { errors } = this.state;

    this.setState({ isWaiting: true });

    createUserSession(
      { email: data },
      password,
      longDuration,
      () => {
        after && after();
      },
      (errorDetails) => {
        this.setState({ isWaiting: false });
        if (errorDetails) {
          this.setState({ errors: R.merge(errors, errorDetails) });
        }
      },
    );
  };

  hasError = (field) => {
    const { errors } = this.state;
    return errors[field];
  };

  errorText = (field) => {
    const { errors } = this.state;
    return R.join(', ', errors[field] ? errors[field] : []);
  };

  render() {
    const {
      isWaiting, email, password,
    } = this.state;

    return (
      <Modal>
        <ModalContext.Consumer>
          {
            ({ closeModal }) => (
              <div>
                <h3>Вход в систему</h3>
                <form action="#">
                  <FormField
                    placeholder="Email"
                    id="email"
                    onChange={this.onEmailChange}
                    type="text"
                    hasError={this.hasError('email')}
                    errorText={this.errorText('email')}
                    value={email}
                  />
                  <FormField
                    placeholder="Пароль"
                    id="password"
                    onChange={this.onPasswordChange}
                    type="password"
                    hasError={this.hasError('password_digest')}
                    errorText={this.errorText('password_digest')}
                    onEnter={
                      () => this.checkAndSubmit(
                        email,
                        password,
                        () => {
                          closeModal();
                          window.location.reload(true);
                        },
                      )
                    }
                    value={password}
                  />
                  <Button
                    isWaiting={isWaiting}
                    onClick={
                      () => this.checkAndSubmit(
                        email,
                        password,
                        () => {
                          closeModal();
                          window.location.reload(true);
                        },
                      )
                    }
                  >
                    Войти
                  </Button>
                </form>
              </div>
            )
          }
        </ModalContext.Consumer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(null, mapDispatchToProps)(LogInForm));
