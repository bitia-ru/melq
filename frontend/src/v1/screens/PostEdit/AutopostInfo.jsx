import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from '../../layouts/CardLayout';
import TextAreaWithPhotoLoader from '../../components/TextAreaWithPhotoLoader/TextAreaWithPhotoLoader';
import InstagramIcon from '../../components/social_links/InstagramIcon/InstagramIcon';
import VKIcon from '../../components/social_links/VKIcon/VKIcon';
import FacebookIcon from '../../components/social_links/FacebookIcon/FacebookIcon';

import { css, StyleSheet } from '../../aphrodite';
import { mainFontColor, themeStyles } from '../../theme';

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
  },
  titleWithMargin: { marginTop: '24px' },
  label: {
    color: mainFontColor,
    marginLeft: '7px',
  },
});

const AutopostInfo = ({ post, onChange, onLoadPhoto, onRemovePhoto }) => (
  <CardLayout title="Автопостинг анонсов">
    <div className={css(styles.title)}>
      <InstagramIcon />
      <span className={css(themeStyles.defaultFont, styles.label)}>Instagram</span>
    </div>
    <TextAreaWithPhotoLoader
      placeholder="Введите текст анонса"
      text={post.instagram_content}
      onChange={event => onChange('instagram_content', event.target.value)}
      onLoadPhoto={data => onLoadPhoto('instagram', data)}
      onRemovePhoto={index => onRemovePhoto('instagram', index)}
    />
    <div className={css(styles.title, styles.titleWithMargin)}>
      <VKIcon />
      <span className={css(themeStyles.defaultFont, styles.label)}>Instagram</span>
    </div>
    <TextAreaWithPhotoLoader
      placeholder="Введите текст анонса"
      text={post.vk_content}
      onChange={event => onChange('vk_content', event.target.value)}
      onLoadPhoto={data => onLoadPhoto('vk', data)}
      onRemovePhoto={index => onRemovePhoto('vk', index)}
    />
    <div className={css(styles.title, styles.titleWithMargin)}>
      <FacebookIcon />
      <span className={css(themeStyles.defaultFont, styles.label)}>Instagram</span>
    </div>
    <TextAreaWithPhotoLoader
      placeholder="Введите текст анонса"
      text={post.facebook_content}
      onChange={event => onChange('facebook_content', event.target.value)}
      onLoadPhoto={data => onLoadPhoto('facebook', data)}
      onRemovePhoto={index => onRemovePhoto('facebook', index)}
    />
  </CardLayout>
);

AutopostInfo.propTypes = {
  post: PropTypes.object,
  onChange: PropTypes.func,
  onLoadPhoto: PropTypes.func,
  onRemovePhoto: PropTypes.func,
};

export default AutopostInfo;
