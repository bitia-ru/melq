import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { defaultColor, focusBgColor, focusBorderColor, themeStyles } from '../../theme';

const styles = StyleSheet.create({
  tooltipWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  tooltip: {
    position: 'absolute',
    display: 'flex',
    padding: '5px',
    borderRadius: '3px',
    backgroundColor: focusBgColor,
    minWidth: '120px',
    maxWidth: '200px',
    color: defaultColor,
    border: `1px solid ${focusBorderColor}`,
    zIndex: '999',
    ':before': {
      content: '\'\'',
      position: 'absolute',
      borderWidth: '10px',
      borderStyle: 'solid',
      zIndex: '998',
    },
    ':after': {
      content: '\'\'',
      position: 'absolute',
      display: 'block',
      borderWidth: '10px',
      borderStyle: 'solid',
      zIndex: '998',
    },
  },
  topSideTooltip: {
    justifyContent: 'center',
    bottom: 'calc(100% + 20px)',
    ':before': {
      bottom: '-20px',
      borderColor: `${focusBorderColor} transparent transparent transparent`,
    },
    ':after': {
      bottom: '-19px',
      borderColor: `${focusBgColor} transparent transparent transparent`,
    },
  },
  rightSideTooltip: {
    alignItems: 'center',
    left: 'calc(100% + 20px)',
    ':before': {
      left: '-20px',
      borderColor: `transparent ${focusBorderColor} transparent transparent`,
    },
    ':after': {
      left: '-19px',
      borderColor: `transparent ${focusBgColor} transparent transparent`,
    },
  },
  bottomSideTooltip: {
    justifyContent: 'center',
    top: 'calc(100% + 20px)',
    ':before': {
      top: '-20px',
      borderColor: `transparent transparent ${focusBorderColor} transparent`,
    },
    ':after': {
      top: '-19px',
      borderColor: `transparent transparent ${focusBgColor} transparent`,
    },
  },
  leftSideTooltip: {
    alignItems: 'center',
    right: 'calc(100% + 20px)',
    ':before': {
      right: '-20px',
      borderColor: `transparent transparent transparent ${focusBorderColor}`,
    },
    ':after': {
      right: '-19px',
      borderColor: `transparent transparent transparent ${focusBgColor}`,
    },
  },
  childrenWrapper: { width: '100%' },
});

const getTooltipSide = (tooltipSide) => {
  switch (tooltipSide) {
  case 'top': {
    return styles.topSideTooltip;
  }
  case 'bottom': {
    return styles.bottomSideTooltip;
  }
  case 'left': {
    return styles.leftSideTooltip;
  }
  case 'right':
  default: {
    return styles.rightSideTooltip;
  }
  }
};

const Tooltip = ({ tooltipText, tooltipSide, children, isShowing }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isShowing || isShowing !== visible) {
      setVisible(isShowing);
    }
  }, [isShowing]);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div className={css(styles.tooltipWrapper)}>
      {
        visible && (
          <span className={css(styles.tooltip, getTooltipSide(tooltipSide), themeStyles.xsFont)}>
            {tooltipText}
          </span>
        )
      }
      <div
        className={css(styles.childrenWrapper)}
        onMouseEnter={isShowing ? null : showTooltip}
        onMouseLeave={isShowing ? null : hideTooltip}
      >
        {children}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipSide: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node.isRequired,
  isShowing: PropTypes.bool,
};

export default Tooltip;
