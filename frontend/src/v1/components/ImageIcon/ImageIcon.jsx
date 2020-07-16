import React from 'react';
import PropTypes from 'prop-types';
import ImageIconLayout from './ImageIconLayout';

const ImageIcon = ({
  src,
  size,
  tooltipText,
  tooltipSide,
  rounded,
  defaultIconSrc,
  defaultIconPosition,
}) => (
  <ImageIconLayout
    src={src}
    size={size}
    rounded={rounded}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
    defaultIconSrc={defaultIconSrc}
    defaultIconPosition={defaultIconPosition}
  />
);

ImageIcon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  defaultIconSrc: PropTypes.string,
  defaultIconPosition: PropTypes.string,
};

export default ImageIcon;
