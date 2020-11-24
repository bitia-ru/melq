import React from 'react';
import PropTypes from 'prop-types';

import { css, StyleSheet } from '../../../aphrodite';

import PanelLayout from './PanelLayout';
import LogOutButton from '../../../components/icon_buttons/LogOutButton/LogOutButton';
import Switch from '../../../components/Switch/Switch';
import LanguageSelect from '../../../components/LanguageSelect/LanguageSelect';
import ThemeSettings from '../../../components/ThemeSettings/ThemeSettings';
import Link from '../../../components/Link/Link';

import { themeStyles, defaultColor, separatorColor } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
  editSwitchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 33,
    paddingBottom: 32,
    borderBottom: `1px solid ${separatorColor}`,
    borderTop: `1px solid ${separatorColor}`,
  },
  editModeLabel: {
    color: defaultColor,
    paddingRight: 20,
  },
  menuWrapper: {
    paddingTop: 36,
    paddingBottom: 39,
    borderBottom: `1px solid ${separatorColor}`,
  },
  languageBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 33,
    borderBottom: `1px solid ${separatorColor}`,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  themeSettingsWrapper: {
    paddingTop: 27,
    paddingBottom: 27,
    flex: 1,
    borderBottom: `1px solid ${separatorColor}`,
  },
  editModeFooter: {
    height: 31,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 31,
    marginBottom: 41,
  },
  defaultFooter: {
    height: 79,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 31,
    marginBottom: 41,
  },
  logOutBtnWrapper: { width: 25 },
});

const AdminPanel = ({ editMode, switchEditMode, logOut, openPrivacyPolicy }) => (
  <PanelLayout>
    <div className={css(styles.container)}>
      <div className={css(styles.editSwitchWrapper)}>
        <span
          className={
            css(
              themeStyles.mediumFont,
              themeStyles.fontWeight500,
              styles.editModeLabel,
            )
          }
        >
          Режим редактора
        </span>
        <Switch onClick={switchEditMode} checked={editMode} />
      </div>
      {
        editMode
          ? (
            <div className={css(styles.content)}>
              <div className={css(styles.menuWrapper)}>
                <span>Здесь будет Menu Component</span>
              </div>
              <div className={css(styles.languageBlock)}>
                <LanguageSelect onChange={() => {}} languageId="ru" />
              </div>
              <div className={css(styles.editModeFooter)}>
                <div className={css(styles.logOutBtnWrapper)}>
                  <LogOutButton onTriggered={logOut} />
                </div>
              </div>
            </div>
          )
          : (
            <div className={css(styles.content)}>
              <div className={css(styles.themeSettingsWrapper)}>
                <ThemeSettings />
              </div>
              <div className={css(styles.defaultFooter)}>
                <Link onTriggered={openPrivacyPolicy} linkStyle="dark" size="big">
                  Правила использования материалов
                </Link>
                <div className={css(styles.logOutBtnWrapper)}>
                  <LogOutButton onTriggered={logOut} />
                </div>
              </div>
            </div>
          )
      }
    </div>
  </PanelLayout>
);

AdminPanel.propTypes = {
  editMode: PropTypes.bool,
  switchEditMode: PropTypes.func,
  logOut: PropTypes.func,
  openPrivacyPolicy: PropTypes.func,
};

export default AdminPanel;
