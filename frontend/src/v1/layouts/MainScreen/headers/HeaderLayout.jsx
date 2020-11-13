import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../../aphrodite';
import { separatorColor } from '@/v1/theme';

import TwoColumnsLayout from '../../TwoColumnsLayout';

const styles = StyleSheet.create({
  container: {
    height: 104,
    width: '100%',
    display: 'flex',
    borderBottom: `1px solid ${separatorColor}`,
    alignItems: 'center',
  },
});

const HeaderLayout = ({ children }) => (
  <div className={css(styles.container)}>
    <TwoColumnsLayout>
      {children}
    </TwoColumnsLayout>
  </div>
);

HeaderLayout.propTypes = { children: PropTypes.node };

export default HeaderLayout;
