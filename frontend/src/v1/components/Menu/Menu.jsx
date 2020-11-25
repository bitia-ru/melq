import React from 'react';
import PropTypes from 'prop-types';
import MenuLayout from './MenuLayout';

const Menu = ({ width, height, menuItems }) => (
  <MenuLayout
    width={width}
    height={height}
    menuItems={menuItems}
  />
);

Menu.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  menuItems: PropTypes.array,
};

export default Menu;
