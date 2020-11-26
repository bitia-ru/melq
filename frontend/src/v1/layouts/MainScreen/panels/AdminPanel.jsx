import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { css, StyleSheet } from '../../../aphrodite';

import PanelLayout from './PanelLayout';
import LogOutButton from '../../../components/icon_buttons/LogOutButton/LogOutButton';
import Switch from '../../../components/Switch/Switch';
import LanguageSelect from '../../../components/LanguageSelect/LanguageSelect';
import TagSettings from '../../../components/TagSettings/TagSettings';
import Link from '../../../components/Link/Link';
import Menu from '../../../components/Menu/Menu';

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
    marginRight: '-40px',
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

const AdminPanel = ({
  editMode,
  switchEditMode,
  logOut,
  openPrivacyPolicy,
  openPrivacyPolicyOnEdit,
  openAboutBlog,
  openAboutBlogOnEdit,
  openTags,
  openNewTag,
  openPosts,
  openNewPost,
  setUpTags,
  openSettings,
  selectedMenuItem,
}) => {
  const menuItems = [
    {
      id: 'settings',
      link: {
        isWaiting: false,
        onTriggered: openSettings,
        linkStyle: 'dark',
        title: 'Базовая информация / настройки',
        size: 'big',
        selected: selectedMenuItem === 'settings',
      },
      icon: {
        src: `${require('../../../components/Menu/images/settings.svg')}#settings`,
        onTriggered: openSettings,
        isWaiting: false,
        width: 24,
        height: 24,
      },
    },
    {
      id: 'posts',
      link: {
        isWaiting: false,
        onTriggered: openPosts,
        linkStyle: 'dark',
        title: 'Посты',
        size: 'big',
        selected: selectedMenuItem === 'posts',
      },
      icon: {
        src: `${require('../../../components/Menu/images/add.svg')}#add`,
        onTriggered: openNewPost,
        isWaiting: false,
        width: 24,
        height: 24,
      },
    },
    {
      id: 'tags',
      link: {
        isWaiting: false,
        onTriggered: openTags,
        linkStyle: 'dark',
        title: 'Темы блога',
        size: 'big',
        selected: selectedMenuItem === 'tags',
      },
      icon: {
        src: `${require('../../../components/Menu/images/add.svg')}#add`,
        onTriggered: openNewTag,
        isWaiting: false,
        width: 24,
        height: 24,
      },
    },
    {
      id: 'about_blog',
      link: {
        isWaiting: false,
        onTriggered: openAboutBlog,
        linkStyle: 'dark',
        title: 'Об этом блоге',
        size: 'big',
        selected: selectedMenuItem === 'about_blog',
      },
      icon: {
        src: `${require('../../../components/Menu/images/edit.svg')}#edit`,
        onTriggered: openAboutBlogOnEdit,
        isWaiting: false,
        width: 24,
        height: 24,
      },
    },
    {
      id: 'privacy_policy',
      link: {
        isWaiting: false,
        onTriggered: openPrivacyPolicy,
        linkStyle: 'dark',
        title: 'Правила использования материалов',
        size: 'big',
        selected: selectedMenuItem === 'privacy_policy',
      },
      icon: {
        src: `${require('../../../components/Menu/images/edit.svg')}#edit`,
        onTriggered: openPrivacyPolicyOnEdit,
        isWaiting: false,
        width: 24,
        height: 24,
      },
    },
  ];

  return (
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
                  <Menu
                    width="100%"
                    height="250px"
                    menuItems={menuItems}
                  />
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
                <div className={css(styles.tagSettingsWrapper)}>
                  <TagSettings setUpTags={setUpTags} />
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
};

AdminPanel.propTypes = {
  editMode: PropTypes.bool,
  switchEditMode: PropTypes.func,
  logOut: PropTypes.func,
  openPrivacyPolicy: PropTypes.func,
  openPrivacyPolicyOnEdit: PropTypes.func,
  openAboutBlog: PropTypes.func,
  openAboutBlogOnEdit: PropTypes.func,
  openTags: PropTypes.func,
  openNewTag: PropTypes.func,
  openPosts: PropTypes.func,
  openNewPost: PropTypes.func,
  openSettings: PropTypes.func,
  setUpTags: PropTypes.func,
  selectedMenuItem: PropTypes.string,
};

export default AdminPanel;
