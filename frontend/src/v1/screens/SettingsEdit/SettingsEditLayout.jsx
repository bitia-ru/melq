import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { css } from '../../aphrodite';
import { themeStyles } from '../../theme';

import CardLayout from '../../layouts/CardLayout';
import ImageIcon from '../../components/ImageIcon/ImageIcon';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import Switch from '../../components/Switch/Switch';
import VKIcon from '../../components/social_links/VKIcon/VKIcon';
import InstagramIcon from '../../components/social_links/InstagramIcon/InstagramIcon';
import FacebookIcon from '../../components/social_links/FacebookIcon/FacebookIcon';
import MainScreen from '../../layouts/MainScreen/MainScreen';

import styles from './styles';

const SettingsEditLayout = ({ settings, user, loadAvatar, onSettingsChange, save }) => {
  const fileInputRef = useRef(null);

  const preparedInput = fieldName => ({
    value: settings[fieldName],
    onChange: (event) => {
      onSettingsChange(fieldName, event.target.value);
    },
  });

  return (
    <MainScreen header="" user={user}>
      <div className={css(themeStyles.headerFont, styles.headerRow)}>Настройки</div>
      <div className={css(styles.content)}>
        <div className={css(styles.leftColumn)}>
          <div>
            <CardLayout padding="small">
              <div className={css(styles.loadAvatarContainer)}>
                <ImageIcon rounded src={settings?.avatar?.content || settings?.avatar?.url} />
                <div className={css(styles.loadBtnWrapper)}>
                  <Button onClick={() => fileInputRef.current.click()}>Загрузить</Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={event => loadAvatar(event.target.files[0])}
                  />
                </div>
              </div>
              <Input
                input={preparedInput('specialization')}
                fontSize="small"
                label="Специальность"
                maxLength={19}
              />
              <div className={css(styles.aboutAuthorTextAreaWrapper)}>
                <TextArea
                  maxLength={123}
                  input={preparedInput('about')}
                  label="Об авторе"
                />
              </div>
            </CardLayout>
          </div>
        </div>
        <div className={css(styles.rightColumn)}>
          <div className={css(styles.topCardBlock)}>
            <div className={css(styles.leftCard)}>
              <CardLayout padding="small">
                <div className={css(styles.keyCardHeaderRow)}>
                <span className={css(themeStyles.headerFont, styles.header)}>
                  Режим обслуживания
                </span>
                  <Switch
                    onClick={
                      () => onSettingsChange('in_development', !settings.in_development)
                    }
                    checked={!settings.in_development}
                  />
                </div>
                <Input
                  input={preparedInput('access_key')}
                  fontSize="small"
                  label="Ключ доступа"
                />
              </CardLayout>
            </div>
            <div className={css(styles.rightCard)}>
              <CardLayout title="Copyright" padding="small">
                <Input
                  input={preparedInput('copyright_year')}
                  fontSize="small"
                  label="Дата"
                />
              </CardLayout>
            </div>
          </div>
          <div className={css(styles.bottomCardBlock)}>
            <div className={css(styles.leftCard)}>
              <CardLayout title="Slug страниц" padding="small">
                <div className={css(styles.aboutBlogInputWrapper)}>
                  <Input
                    input={preparedInput('about_blog_slug')}
                    fontSize="small"
                    label="Об этом блоге"
                  />
                </div>
                <Input
                  input={preparedInput('privacy_policy_slug')}
                  fontSize="small"
                  label="Правила использования материалов"
                />
              </CardLayout>
            </div>
            <div className={css(styles.rightColumn)}>
              <CardLayout title="Интеграция с соц.сетями" padding="small">
                <div
                  className={
                    css(
                      styles.socialLinkRow,
                      styles.socialLinkRowBordered,
                      styles.socialLinkRowTop,
                    )
                  }
                >
                  <div className={css(styles.socialLinkIconWrapper)}>
                    <VKIcon />
                    <span
                      className={
                        css(
                          styles.socialLinkIntegrationState,
                          themeStyles.defaultFont,
                          styles.socialLinkIntegrationStateActive,
                        )
                      }
                    >
                      Подключено
                    </span>
                  </div>
                  <Switch onClick={() => {}} checked />
                </div>
                <div className={css(styles.socialLinkRow, styles.socialLinkRowBordered)}>
                  <div className={css(styles.socialLinkIconWrapper)}>
                    <InstagramIcon />
                    <span
                      className={
                        css(
                          styles.socialLinkIntegrationState,
                          themeStyles.defaultFont,
                          styles.socialLinkIntegrationStateActive,
                        )
                      }
                    >
                      Подключено
                    </span>
                  </div>
                  <Switch onClick={() => {}} checked />
                </div>
                <div className={css(styles.socialLinkRow)}>
                  <div className={css(styles.socialLinkIconWrapper)}>
                    <FacebookIcon />
                    <span
                      className={
                        css(
                          styles.socialLinkIntegrationState,
                          themeStyles.defaultFont,
                        )
                      }
                    >
                      Отключено
                    </span>
                  </div>
                  <Switch onClick={() => {}} />
                </div>
              </CardLayout>
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '133px'}}><Button onClick={save} btnStyle="info">Сохранить</Button></div>
    </MainScreen>
  );
};

SettingsEditLayout.propTypes = {
  settings: PropTypes.object,
  user: PropTypes.object,
  loadAvatar: PropTypes.func,
  onSettingsChange: PropTypes.func,
  save: PropTypes.func,
};

export default SettingsEditLayout;
