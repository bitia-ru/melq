import React from 'react';

import { css, StyleSheet } from '../../../aphrodite';

import HeaderLayout from './HeaderLayout';
import Link from '../../../components/Link/Link';
import Search from '../../../components/Search/Search';
import LanguageSelect from '../../../components/LanguageSelect/LanguageSelect';

const styles = StyleSheet.create({
  leftBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  blogLinkWrapper: { marginRight: 45 },
  aboutBlogLinkWrapper: { marginRight: 48 },
  languageSelectWrapper: { textAlign: 'right' },
});

const DefaultHeader = () => (
  <HeaderLayout>
    <div className={css(styles.leftBlock)}>
      <div className={css(styles.blogLinkWrapper)}>
        <Link onTriggered={() => {}} linkStyle="dark" size="big" selected>Блог</Link>
      </div>
      <div className={css(styles.aboutBlogLinkWrapper)}>
        <Link onTriggered={() => {}} linkStyle="dark" size="big">Об этом блоге</Link>
      </div>
      <div>
        <Search onChange={() => {}} variants={[]} />
      </div>
    </div>
    <div className={css(styles.languageSelectWrapper)}>
      <LanguageSelect onChange={() => {}} languageId="ru" />
    </div>
  </HeaderLayout>
);

export default DefaultHeader;
