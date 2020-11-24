import React from 'react';
import PropTypes from 'prop-types';

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

const DefaultHeader = ({ openBlog, openAboutBlog, selected }) => (
  <HeaderLayout>
    <div className={css(styles.leftBlock)}>
      <div className={css(styles.blogLinkWrapper)}>
        <Link
          onTriggered={openBlog}
          linkStyle="dark"
          size="big"
          selected={selected === 'index'}
        >
          Блог
        </Link>
      </div>
      <div className={css(styles.aboutBlogLinkWrapper)}>
        <Link
          onTriggered={openAboutBlog}
          linkStyle="dark"
          size="big"
          selected={selected === 'about'}
        >
          Об этом блоге
        </Link>
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

DefaultHeader.propTypes = {
  openBlog: PropTypes.func,
  openAboutBlog: PropTypes.func,
  selected: PropTypes.string,
};

export default DefaultHeader;
