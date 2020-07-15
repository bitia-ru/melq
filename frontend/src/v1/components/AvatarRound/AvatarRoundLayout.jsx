import React from 'react';
import PropTypes from 'prop-types';
import ImageIcon from '@/v1/components/ImageIcon/ImageIcon';

const defaultAvatar = `${require('./images/avatar.svg')}`;

const AvatarRoundLayout = ({ src, size, tooltipText, tooltipSide }) => (
  <ImageIcon
    src={src}
    tooltipText={tooltipText}
    tooltipSide={tooltipSide}
    rounded
    size={size}
    defaultIconSrc={defaultAvatar}
    defaultIconPosition="bottom center"
  />
);

AvatarRoundLayout.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default AvatarRoundLayout;
