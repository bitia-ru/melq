import React from 'react';
import PropTypes from 'prop-types';
import MenuItemLayout from './MenuItemLayout';

const MenuItem = ({ id, link, disabled, icon }) => (
  <MenuItemLayout
    id={id}
    link={link}
    disabled={disabled}
    icon={icon}
  />
);

MenuItem.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
  link: PropTypes.object,
  icon: PropTypes.object,
};

export default MenuItem;
