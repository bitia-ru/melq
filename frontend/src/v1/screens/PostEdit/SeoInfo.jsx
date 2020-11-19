import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import CardLayout from '../../layouts/CardLayout';

import { css, StyleSheet } from '../../aphrodite';

const styles = StyleSheet.create({ row: { marginTop: '21px' } });

const SeoInfo = ({ post, onChange }) => (
  <CardLayout title="SEO-информация">
    <Input
      input={{ value: post.slug, onChange: event => onChange('slug', event.target.value) }}
      label="Slug"
    />
    <div className={css(styles.row)}>
      <Input
        input={{ value: post.seo_title, onChange: event => onChange('seo_title', event.target.value) }}
        label="SEO-заголовок"
      />
    </div>
    <div className={css(styles.row)}>
      <Input
        input={{ value: post.seo_kw, onChange: event => onChange('seo_kw', event.target.value) }}
        label="SEO-ключевые слова"
      />
    </div>
  </CardLayout>
);

SeoInfo.propTypes = {
  post: PropTypes.object,
  onChange: PropTypes.func,
};

export default SeoInfo;
