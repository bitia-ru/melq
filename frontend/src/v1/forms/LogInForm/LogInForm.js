import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../../layouts/Modal';
import { createUserSession } from '../../utils/auth';
import { default as LogInFormContent } from '@/v1/components/LogInForm/LogInForm';

import { ModalContext } from '../../modules/modalable';

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isWaiting: false,
    };
  }

  onFormSubmit = (fields, afterSuccess, afterFail) => {
    this.setState({ isWaiting: true, errors: {} });

    createUserSession(
      { email: fields.email },
      fields.password,
      () => {
        afterSuccess && afterSuccess();
      },
      (errorDetails) => {
        this.setState({ isWaiting: false });
        if (errorDetails) {
          this.setState({ errors: errorDetails });
          afterFail(errorDetails);
        }
      },
    );
  };

  render() {
    const { isWaiting } = this.state;
    return (
      <Modal>
        <ModalContext.Consumer>
          {
            ({ closeModal }) => (
              <LogInFormContent
                externalErrors={this.state.errors}
                onSubmit={
                  (fields, showErrors) => {
                    this.onFormSubmit(
                      fields,
                      () => {
                        closeModal();
                        window.location.reload(true);
                      },
                      showErrors,
                    );
                  }
                }
                isWaiting={isWaiting}
              />
            )
          }
        </ModalContext.Consumer>
      </Modal>
    );
  }
}

const mapDispatchToProps = _dispatch => ({});

export default withRouter(connect(null, mapDispatchToProps)(LogInForm));
