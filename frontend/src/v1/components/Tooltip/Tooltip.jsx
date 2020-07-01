import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const styles = StyleSheet.create({
  tooltip: {
    visibility: 'hidden',
    width: '120px',
    textAlign: 'center',
    borderRadius: '3px',
    padding: '5px 0',
    position: 'absolute',
    zIndex: 1,
    top: '120%',
    left: '50%',
    marginLeft: '-60px',
    ':before': {
      content: '\'\'',
      position: 'absolute',
      bottom: '100%',
      left: '45%',
      marginLeft: '-5px',
      borderWidth: '10px',
      borderStyle: 'solid',
    },
    ':after': {
      content: '\'\'',
      position: 'absolute',
      bottom: '100%',
      left: '45%',
      marginLeft: '-5px',
      borderWidth: '10px',
      borderStyle: 'solid',
      top: '-18px',
    },
  },
});

const Tooltip = ({ tooltipText, tooltipStyles }) => (
  <span className={css(styles.tooltip, tooltipStyles)}>{tooltipText}</span>
);

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipStyles: PropTypes.string.isRequired,
};

export default Tooltip;
