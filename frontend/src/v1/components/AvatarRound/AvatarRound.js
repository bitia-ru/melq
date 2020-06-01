import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const AvatarRound = ({ src }) => (
  <img className={css(styles.avatarRound)} src={src} alt=""/>
);

const styles = StyleSheet.create({
  avatarRound: {
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
    width: '48px',
    height: '48px',
  }
});

AvatarRound.propTypes = {
};

export default AvatarRound;
