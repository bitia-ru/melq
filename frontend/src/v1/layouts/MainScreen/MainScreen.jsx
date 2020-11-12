import React from 'react';
import { withRouter } from 'react-router-dom';
import { css, StyleSheet } from '../../aphrodite';
import withModals, { ModalContainerContext } from '../../modules/modalable';
import { closeUserSession } from '@/v1/utils/auth';

import LogInForm from '../../forms/LogInForm/LogInForm';
import AdminPanel from './panels/AdminPanel';
import UserPanel from './panels/UserPanel';
import EditModeHeader from './headers/EditModeHeader';
import DefaultHeader from './headers/DefaultHeader';

import './scroll_workaround.css';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    overflowX: 'hidden',
  },
  scrollable: { overflowY: 'auto' },
  unscrollable: { overflowY: 'hidden' },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '28% 72%',
  },
  mainContent: {
    display: 'grid',
    gridTemplateRows: '101px auto',
    marginLeft: 51,
    marginRight: 104,
  },
});

class MainScreen extends React.PureComponent {
  modals() {
    return {
      signin: {
        hashRoute: true,
        body: <LogInForm />,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }

  renderPanel = () => {
    const { editMode } = this.state;
    if (this.props.user) {
      return (
        <AdminPanel
          editMode={editMode}
          switchEditMode={() => this.setState({ editMode: !editMode })}
          logOut={closeUserSession}
        />
      );
    }
    return <UserPanel signIn={() => this.props.history.push('#signin')} />;
  };

  renderHeader = () => {
    if (this.state.editMode) {
      return <EditModeHeader addNewPost={() => this.props.history.push('/new')} />;
    }
    return <DefaultHeader />;
  };

  render() {
    const { children, header } = this.props;

    return (
      <ModalContainerContext.Consumer>
        {
          ({ isModalShown }) => (
            <div
              className={
                css(
                  styles.container,
                  isModalShown ? styles.unscrollable : styles.scrollable,
                )
              }
            >
              <div className={css(styles.wrapper)}>
                { this.renderPanel() }
                <div className={css(styles.mainContent)}>
                  { this.renderHeader() }
                  <div>
                    {children && children}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </ModalContainerContext.Consumer>
    );
  }
}

export default withRouter(withModals(MainScreen));
