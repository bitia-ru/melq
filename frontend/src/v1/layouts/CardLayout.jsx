import React from 'react';
import PropTypes from 'prop-types';

import { css, StyleSheet } from '../aphrodite';
import { bgColor, mainFontColor, themeStyles } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    paddingTop: '35px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '40px',
    height: '100%',
    boxSizing: 'border-box',
  },
  title: {
    color: mainFontColor,
    marginBottom: '14px',
  },
});

const CardLayout = ({ children, title }) => (
  <div className={css(styles.container)}>
    {
      title && (
        <div className={css(themeStyles.headerFont, styles.title)}>{title}</div>
      )
    }
    {children}
  </div>
);

CardLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default CardLayout;
