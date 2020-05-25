import React from 'react';
import { withRouter } from 'react-router-dom';
import { css, StyleSheet } from '../../aphrodite';
import withModals, { ModalContainerContext } from '../../modules/modalable';
import LogInForm from '../../forms/LogInForm/LogInForm';
import TextHeader from './TextHeader';

import './scroll_workaround.css';

class MainScreen extends React.PureComponent {
  modals() {
    return {
      signin: {
        hashRoute: true,
        body: <LogInForm />,
      },
    };
  }

  render() {
    const { children, header } = this.props;

    return (
      <ModalContainerContext.Consumer>
        {
          ({ isModalShown }) => (
            <div
              className={
                css(
                  style.container,
                  isModalShown ? style.unscrollable : style.scrollable,
                )
              }
            >
              <div style={{ flex: 1 }}>
                {
                  header && (
                    typeof header === 'string' || typeof header === 'number'
                      ? <TextHeader title={header} /> : header
                  )
                }
                {children && children}
              </div>
            </div>
          )
        }
      </ModalContainerContext.Consumer>
    );
  }
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    overflowX: 'hidden',
  },
  scrollable: {
    overflowY: 'auto',
  },
  unscrollable: {
    overflowY: 'hidden',
  },
});

export default withRouter(withModals(MainScreen));
