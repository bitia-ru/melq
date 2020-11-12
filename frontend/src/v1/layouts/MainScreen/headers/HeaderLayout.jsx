import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../../aphrodite';
import { separatorColor } from '@/v1/theme';

const styles = StyleSheet.create({
  container: {
    height: 104,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${separatorColor}`,
    alignItems: 'center',
  },
});

const HeaderLayout = ({ children }) => (
  <div className={css(styles.container)}>
    {children}
  </div>
);

HeaderLayout.propTypes = { children: PropTypes.node };

export default HeaderLayout;
