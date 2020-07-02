import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { bgColor, mainFontColor } from '../../theme';

const styles = StyleSheet.create({
  tooltip: {
    visibility: 'hidden',
    width: '120px',
    textAlign: 'center',
    borderRadius: '3px',
    padding: '5px 0',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: mainFontColor,
    color: bgColor,
    border: `1px solid ${mainFontColor}`,
    ':before': {
      content: '\'\'',
      position: 'absolute',
      borderWidth: '10px',
      borderStyle: 'solid',
    },
    ':after': {
      content: '\'\'',
      position: 'absolute',
      borderWidth: '10px',
      borderStyle: 'solid',
    },
  },
  rightSideTooltip: {
    top: '-5px',
    left: '80%',
    marginLeft: '30px',
    ':before': {
      top: '5px',
      left: '0%',
      marginLeft: '-20px',
      borderColor: `transparent ${mainFontColor} transparent transparent`,
    },
    ':after': {
      top: '5px',
      left: '1%',
      marginLeft: '-20px',
      borderColor: `transparent ${mainFontColor} transparent transparent`,
    },
  },
  bottomSideTooltip: {
    top: '120%',
    left: '50%',
    marginLeft: '-60px',
    ':before': {
      bottom: '100%',
      left: '45%',
      marginLeft: '-5px',
      borderColor: `transparent transparent ${mainFontColor} transparent`,
    },
    ':after': {
      bottom: '97%',
      left: '45%',
      marginLeft: '-5px',
      borderColor: `transparent transparent ${mainFontColor} transparent`,
    },
  },
});

const getTooltipSide = (tooltipSide) => {
  switch (tooltipSide) {
  case 'right': {
    return styles.rightSideTooltip;
  }
  case 'bottom':
  default: {
    return styles.bottomSideTooltip;
  }
  }
};

const Tooltip = ({ tooltipText, tooltipSide }) => (
  <span
    className={
      css(
        styles.tooltip,
        getTooltipSide(tooltipSide),
      )
    }
  >
    {tooltipText}
  </span>
);

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipSide: PropTypes.string,
};

export default Tooltip;
