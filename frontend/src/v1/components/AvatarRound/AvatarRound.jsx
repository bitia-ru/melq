import React from 'react';
import PropTypes from 'prop-types';
import AvatarRoundLayout from './AvatarRoundLayout';

const AvatarRound = ({ src, size, tooltipText, tooltipSide }) => (
  <AvatarRoundLayout src={src} size={size} tooltipText={tooltipText} tooltipSide={tooltipSide} />
);

AvatarRound.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default AvatarRound;
