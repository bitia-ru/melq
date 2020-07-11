import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { errorColor, themeStyles } from '@/v1/theme';

const styles = StyleSheet.create({
  container: {
    color: errorColor,
    display: 'flex',
    alignItems: 'center',
    '> svg': { fill: errorColor },
  },
  iconContainer: {
    minWidth: 16,
    minHeight: 16,
    display: 'flex',
    alignItem: 'center',
  },
  msg: { marginLeft: 7 },
});

const ErrorLayout = ({ message }) => (
  <div className={css(styles.container, themeStyles.bordered)}>
    <div className={css(styles.iconContainer)}>
      <svg width={16} height={16}>
        <use xlinkHref={`${require('./images/error.svg')}#error`} />
      </svg>
    </div>
    <span className={css(styles.msg, themeStyles.defaultFont, themeStyles.fontWeight500)}>
      {message}
    </span>
  </div>
);

ErrorLayout.propTypes = { message: PropTypes.string };

export default ErrorLayout;
