import React from 'react';
import PropTypes from 'prop-types';
import ItemLayout from './ItemLayout';

const Item = ({
  text,
  iconSrc,
  tooltipText,
  tooltipSide,
  hoverable,
  focusable,
  width,
  height,
  size,
  textMargin,
  disabled,
  itemHoverStyle,
  onTriggered,
}) => {
  const onKeyUp = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onTriggered && onTriggered();
    }
  };

  return (
    <ItemLayout
      text={text}
      iconSrc={iconSrc}
      tooltipSide={tooltipSide}
      tooltipText={tooltipText}
      hoverable={hoverable}
      focusable={focusable}
      disabled={disabled}
      width={width}
      height={height}
      size={size}
      textMargin={textMargin}
      itemHoverStyle={itemHoverStyle}
      onClick={onTriggered}
      onKeyUp={onKeyUp}
    />
  );
};

Item.propTypes = {
  text: PropTypes.string,
  iconSrc: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  hoverable: PropTypes.bool,
  focusable: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  textMargin: PropTypes.number,
  itemHoverStyle: PropTypes.object,
  onTriggered: PropTypes.func,
};

export default Item;
