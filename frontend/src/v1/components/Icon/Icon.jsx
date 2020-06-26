import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconLayout from './IconLayout';

const Icon = ({
  src,
  onTriggered,
  disabled,
  isWaiting,
  iconStyle,
  iconDisabledStyle,
  iconActiveStyle,
  smallBorderRadius,
  width,
  height,
  tooltipText,
  tooltipSide,
}) => {
  const [active, setActive] = useState(false);

  const onKeyUp = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setActive(false);
      onTriggered && onTriggered();
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setActive(true);
    }
  };

  return (
    <IconLayout
      src={src}
      onClick={onTriggered}
      disabled={disabled}
      isWaiting={isWaiting}
      iconStyle={iconStyle}
      iconDisabledStyle={iconDisabledStyle}
      iconActiveStyle={iconActiveStyle}
      smallBorderRadius={smallBorderRadius}
      width={width}
      height={height}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      active={active}
    />
  );
};

Icon.propTypes = {
  src: PropTypes.string,
  onTriggered: PropTypes.func,
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  iconStyle: PropTypes.object,
  iconDisabledStyle: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  iconActiveStyle: PropTypes.object,
  smallBorderRadius: PropTypes.bool,
};

export default Icon;
