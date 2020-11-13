import React from 'react';
import PropTypes from 'prop-types';

import { css, StyleSheet } from '../aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '78% 22%',
    width: '100%',
  },
  rightColumn: { marginLeft: 70 },
});

const TwoColumnsLayout = ({ children }) => (
  <div className={css(styles.container)}>
    {children[0]}
    <div className={css(styles.rightColumn)}>
      {children[1]}
    </div>
  </div>
);

TwoColumnsLayout.propTypes = { children: PropTypes.node };

export default TwoColumnsLayout;
