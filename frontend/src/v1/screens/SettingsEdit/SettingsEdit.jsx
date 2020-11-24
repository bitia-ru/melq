import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentUser } from '@/v1/redux/user_session/utils';
import { updateSettings } from '../../redux/settings/actions';

import SettingsEditLayout from './SettingsEditLayout';

class SettingsEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { settings: {} };
  }

  onSettingsChange = (fieldName, fieldValue) => {
    this.setState({ settings: { ...this.state.settings, [fieldName]: fieldValue } });
  };

  loadAvatar = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = () => {
      this.onSettingsChange('avatar', { file, content: this.fileReader.result });
    };
    this.fileReader.readAsDataURL(file);
  };

  save = () => {
    const { settings } = this.state;
    const formData = new FormData();

    if (settings.specialization) {
      formData.append('setting[specialization]', settings.specialization);
    }
    if (settings.about) {
      formData.append('setting[about]', settings.about);
    }
    if (settings.in_development !== undefined) {
      formData.append('setting[in_development]', settings.in_development);
    }
    if (settings.access_key) {
      formData.append('setting[access_key]', settings.access_key);
    }
    if (settings.copyright_year) {
      formData.append('setting[copyright_year]', settings.copyright_year);
    }
    if (settings.about_blog_slug) {
      formData.append('setting[about_blog_slug]', settings.about_blog_slug);
    }
    if (settings.privacy_policy_slug) {
      formData.append('setting[privacy_policy_slug]', settings.privacy_policy_slug);
    }
    if (settings?.avatar?.file) {
      formData.append('setting[avatar]', settings.avatar.file);
    }
    this.props.updateSettings(
      formData,
    );
  };

  render() {
    const { user, settings: settingsProps } = this.props;
    const { settings: settingsState } = this.state;
    const settings = {
      ...settingsProps,
      ...settingsState,
    };

    return (
      <SettingsEditLayout
        user={user}
        settings={settings}
        loadAvatar={this.loadAvatar}
        onSettingsChange={this.onSettingsChange}
        save={this.save}
      />
    );
  }
}

SettingsEdit.propTypes = {
  user: PropTypes.object,
  settings: PropTypes.object,
  updateSettings: PropTypes.func,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  settings: state.settingsStoreV1.settings[1],
});

const mapDispatchToProps = dispatch => ({
  updateSettings: (attributes, afterSuccess, afterAll) => (
    dispatch(updateSettings(attributes, afterSuccess, afterAll))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingsEdit));
