import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const styles = StyleSheet.create({
  avatarRound: {
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
    width: '48px',
    height: '48px',
  },
});

const AvatarRound = ({ src }) => (
  <img className={css(styles.avatarRound)} src={src} alt="" />
);

AvatarRound.propTypes = { src: PropTypes.string };

export default AvatarRound;
