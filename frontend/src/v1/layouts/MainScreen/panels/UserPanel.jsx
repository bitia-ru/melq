import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../../aphrodite';

import PanelLayout from './PanelLayout';
import Link from '../../../components/Link/Link';
import TagSettings from '../../../components/TagSettings/TagSettings';
import LogInButton from '../../../components/icon_buttons/LogInButton/LogInButton';

import { separatorColor } from '@/v1/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
  contactAuthorWrapper: {
    paddingBottom: 36,
    borderBottom: `1px solid ${separatorColor}`,
  },
  tagSettingsWrapper: {
    paddingTop: 27,
    paddingBottom: 27,
    flex: 1,
    borderBottom: `1px solid ${separatorColor}`,
  },
  footer: {
    height: 71,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 31,
    marginBottom: 41,
  },
  logInBtnWrapper: {
    width: 24,
    marginBottom: 28,
  },
});

const UserPanel = ({ signIn, openPrivacyPolicy, setUpTags }) => (
  <PanelLayout>
    <div className={css(styles.container)}>
      <div className={css(styles.contactAuthorWrapper)}>
        <Link onTriggered={() => console.log('Написать автору')} size="big">
          Написать автору
        </Link>
      </div>
      <div className={css(styles.tagSettingsWrapper)}>
        <TagSettings setUpTags={setUpTags} />
      </div>
      <div className={css(styles.footer)}>
        <div className={css(styles.logInBtnWrapper)}>
          <LogInButton onTriggered={signIn} />
        </div>
        <Link onTriggered={openPrivacyPolicy} linkStyle="dark" size="big">
          Правила использования материалов
        </Link>
      </div>
    </div>
  </PanelLayout>
);

UserPanel.propTypes = {
  signIn: PropTypes.func,
  openPrivacyPolicy: PropTypes.func,
  setUpTags: PropTypes.func,
};

export default UserPanel;
