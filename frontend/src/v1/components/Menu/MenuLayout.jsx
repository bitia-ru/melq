import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem/MenuItem';
import { StyleSheet, css } from '../../aphrodite';

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const MenuLayout = ({ width, height, menuItems }) => (
  <div style={{ width, height }} className={css(styles.menu)}>
    {
      menuItems.map(itemProps => (
        <MenuItem
          key={itemProps.id}
          id={itemProps.id}
          icon={itemProps.icon}
          disabled={itemProps.disabled}
          link={itemProps.link}
        />
      ))
    }
  </div>
);

MenuLayout.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  menuItems: PropTypes.array,
};

export default MenuLayout;
