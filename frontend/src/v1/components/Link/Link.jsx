import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinkLayout from './LinkLayout';

const Link = ({
  disabled,
  isWaiting,
  onTriggered,
  linkStyle,
  children,
  size,
  selected,
  tooltipText,
  tooltipSide,
}) => {
  const [active, setActive] = useState(false);

  const onKeyUp = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setActive(false);
      onTriggered();
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setActive(true);
    }
  };

  return (
    <LinkLayout
      disabled={disabled}
      isWaiting={isWaiting}
      onClick={onTriggered}
      linkStyle={linkStyle}
      size={size}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      active={selected || active}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
    >
      {children}
    </LinkLayout>
  );
};

Link.propTypes = {
  disabled: PropTypes.bool,
  isWaiting: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  linkStyle: PropTypes.string,
  onTriggered: PropTypes.func.isRequired,
  size: PropTypes.string,
  selected: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default Link;
