import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import {
  bgColor,
  defaultColor,
  focusBgColor,
  focusBorderColor,
  mainFontColor,
  selectedItemColor,
  separatorColor,
} from '../../theme';

const styles = StyleSheet.create({
  tooltip: {
    visibility: 'hidden',
    width: '120px',
    textAlign: 'center',
    borderRadius: '3px',
    padding: '5px 0',
    position: 'absolute',
    zIndex: 1,
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
    },
    ':after': {
      top: '5px',
      left: '1%',
      marginLeft: '-20px',
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
    },
    ':after': {
      bottom: '97%',
      left: '45%',
      marginLeft: '-5px',
    },
  },

  focusBgColorTooltip: {
    backgroundColor: focusBgColor,
    color: defaultColor,
    border: `1px solid ${focusBorderColor}`,
  },
  focusBgColorRightSideTooltip: {
    ':before': { borderColor: `transparent ${focusBorderColor} transparent transparent` },
    ':after': { borderColor: `transparent ${focusBgColor} transparent transparent` },
  },
  focusBgColorBottomSideTooltip: {
    ':before': { borderColor: `transparent transparent ${focusBorderColor} transparent` },
    ':after': { borderColor: `transparent transparent ${focusBgColor} transparent` },
  },

  mainFontColorTooltip: {
    backgroundColor: mainFontColor,
    color: bgColor,
    border: `1px solid ${mainFontColor}`,
  },
  mainFontColorRightSideTooltip: {
    ':before': { borderColor: `transparent ${mainFontColor} transparent transparent` },
    ':after': { borderColor: `transparent ${mainFontColor} transparent transparent` },
  },
  mainFontColorBottomSideTooltip: {
    ':before': { borderColor: `transparent transparent ${mainFontColor} transparent` },
    ':after': { borderColor: `transparent transparent ${mainFontColor} transparent` },
  },

  selectedItemColorTooltip: {
    backgroundColor: selectedItemColor,
    color: mainFontColor,
    border: `1px solid ${selectedItemColor}`,
  },
  selectedItemColorRightSideTooltip: {
    ':before': { borderColor: `transparent ${selectedItemColor} transparent transparent` },
    ':after': { borderColor: `transparent ${selectedItemColor} transparent transparent` },
  },
  selectedItemColorBottomSideTooltip: {
    ':before': { borderColor: `transparent transparent ${selectedItemColor} transparent` },
    ':after': { borderColor: `transparent transparent ${selectedItemColor} transparent` },
  },

  separatorColorTooltip: {
    backgroundColor: separatorColor,
    color: mainFontColor,
    border: `1px solid ${separatorColor}`,
  },
  separatorColorRightSideTooltip: {
    ':before': { borderColor: `transparent ${separatorColor} transparent transparent` },
    ':after': { borderColor: `transparent ${separatorColor} transparent transparent` },
  },
  separatorColorBottomSideTooltip: {
    ':before': { borderColor: `transparent transparent ${separatorColor} transparent` },
    ':after': { borderColor: `transparent transparent ${separatorColor} transparent` },
  },
});

const getTooltipColors = (typeOfColor) => {
  switch (typeOfColor) {
  case 'focusBgColorTooltip': {
    return styles.focusBgColorTooltip;
  }
  case 'mainFontColorTooltip': {
    return styles.mainFontColorTooltip;
  }
  case 'selectedItemColorTooltip': {
    return styles.selectedItemColorTooltip;
  }
  case 'separatorColorTooltip':
  default: {
    return styles.separatorColorTooltip;
  }
  }
};

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

const getTooltipPseudoElemSide = (colorStyle, side) => {
  if (side === 'right') {
    switch (colorStyle) {
    case 'focusBgColorTooltip': {
      return styles.focusBgColorRightSideTooltip;
    }
    case 'mainFontColorTooltip': {
      return styles.mainFontColorRightSideTooltip;
    }
    case 'selectedItemColorTooltip': {
      return styles.selectedItemColorRightSideTooltip;
    }
    case 'separatorColorTooltip':
    default: {
      return styles.separatorColorRightSideTooltip;
    }
    }
  }
  if (side === 'bottom') {
    switch (colorStyle) {
    case 'focusBgColorTooltip': {
      return styles.focusBgColorBottomSideTooltip;
    }
    case 'mainFontColorTooltip': {
      return styles.mainFontColorBottomSideTooltip;
    }
    case 'selectedItemColorTooltip': {
      return styles.selectedItemColorBottomSideTooltip;
    }
    case 'separatorColorTooltip':
    default: {
      return styles.separatorColorBottomSideTooltip;
    }
    }
  }
  return '';
};

const Tooltip = ({ tooltipText, tooltipColorStyle, tooltipSide }) => (
  <span
    className={
      css(
        styles.tooltip,
        getTooltipColors(tooltipColorStyle),
        getTooltipSide(tooltipSide),
        getTooltipPseudoElemSide(tooltipColorStyle, tooltipSide),
      )
    }
  >
    {tooltipText}
  </span>
);

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipColorStyle: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default Tooltip;
