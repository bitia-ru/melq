import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const styles = StyleSheet.create({
  tooltipText: {
    visibility: 'hidden',
    width: '120px',
    backgroundColor: '#52C4A9',
    color: 'white',
    textAlign: 'center',
    borderRadius: '3px',
    padding: '5px 0',
    position: 'absolute',
    zIndex: 1,
    top: '120%',
    left: '50%',
    marginLeft: '-60px',
    ':after': {
      content: '\'\'',
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      marginLeft: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: 'transparent transparent #52C4A9 transparent',
    },
  },
});

const Tooltip = ({ tooltipText }) => (
  <span className={css(styles.tooltipText)}>{tooltipText}</span>
);


Tooltip.propTypes = { tooltipText: PropTypes.string.isRequired };

export default Tooltip;
