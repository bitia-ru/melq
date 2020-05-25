import React from 'react';
import { css, StyleSheet } from '../../aphrodite';

const TextHeader = ({ title, styles }) => (
  <div className={css(style.container, styles)}>
    {title}
  </div>
);

const style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#718B9F',
    boxSizing: 'border-box',
    maxWidth: '1600px',
    minHeight: '135px',
    paddingTop: '100px',
    lineHeight: '65px',
    paddingLeft: '30px',
    paddingRight: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '60px',
    color: 'rgb(250, 250, 250)',
    fontSize: '22.5px',
    textShadow: 'rgb(0, 0, 0) 0px 0px 1px',
  },
});

export default TextHeader;
