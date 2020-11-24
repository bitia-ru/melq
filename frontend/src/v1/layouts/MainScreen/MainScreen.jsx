import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { css, StyleSheet } from '../../aphrodite';
import withModals, { ModalContainerContext } from '../../modules/modalable';
import SettingsContext from '../../contexts/SettingsContext';
import { closeUserSession } from '@/v1/utils/auth';

import { setEditMode as setEditModeAction } from '../../redux/editMode/actions';
import { loadSettings } from '../../redux/settings/actions';
import setUnselectedThemesIds from '../../redux/unselectedThemes/actions';

import LogInForm from '../../forms/LogInForm/LogInForm';
import AdminPanel from './panels/AdminPanel';
import UserPanel from './panels/UserPanel';
import EditModeHeader from './headers/EditModeHeader';
import DefaultHeader from './headers/DefaultHeader';
import SetUpThemesForm from '../../forms/SetUpThemesForm';

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
      setup_themes: {
        hashRoute: true,
        body: (
          <SetUpThemesForm
            themes={this.props.tags}
            defaultUnselectedIds={this.props.unselectedThemesIds}
            save={this.props.setUnselectedThemesIds}
          />
        ),
      },
    };
  }

  componentDidMount() {
    this.props.loadSettings();
  }

  renderPanel = () => {
    const { editMode, user, setEditMode } = this.props;
    if (user) {
      return (
        <AdminPanel
          editMode={editMode}
          switchEditMode={() => setEditMode(!editMode) }
          logOut={closeUserSession}
          setUpThemes={() => this.props.history.push('#setup_themes')}
          openPrivacyPolicy={
            () => this.props.history.push(`/${this.props.settings.privacy_policy_slug}`)
          }
        />
      );
    }
    return (
      <UserPanel
        signIn={() => this.props.history.push('#signin')}
        setUpThemes={() => this.props.history.push('#setup_themes')}
        openPrivacyPolicy={
          () => this.props.history.push(`/${this.props.settings.privacy_policy_slug}`)
        }
      />
    );
  };

  renderHeader = () => {
    if (this.props.editMode) {
      return <EditModeHeader addNewPost={() => this.props.history.push('/new')} />;
    }
    return (
      <DefaultHeader
        openBlog={() => this.props.history.push('/')}
        openAboutBlog={() => this.props.history.push(`/${this.props.settings.about_blog_slug}`)}
        selected={
          this.props.match.params?.slug === this.props.settings?.about_blog_slug
            ? 'about'
            : 'index'
        }
      />
    );
  };

  render() {
    const { children, settings } = this.props;

    return (
      <SettingsContext.Provider value={{ settings }}>
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
      </SettingsContext.Provider>
    );
  }
}

MainScreen.propTypes = {
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  children: PropTypes.node,
  history: PropTypes.object,
  user: PropTypes.object,
  settings: PropTypes.object,
  loadSettings: PropTypes.func,
  tags: PropTypes.array,
  setUnselectedThemesIds: PropTypes.func,
  unselectedThemesIds: PropTypes.array,
};

const mapStateToProps = state => ({
  editMode: state.editMode,
  settings: state.settingsStoreV1.settings[1],
  tags: R.values(state.tagsStoreV1.tags),
  unselectedThemesIds: state.unselectedThemesIds,
});

const mapDispatchToProps = dispatch => ({
  setEditMode: editMode => dispatch(setEditModeAction(editMode)),
  loadSettings: () => dispatch(loadSettings()),
  setUnselectedThemesIds: themesIds => dispatch(setUnselectedThemesIds(themesIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withModals(MainScreen)));
