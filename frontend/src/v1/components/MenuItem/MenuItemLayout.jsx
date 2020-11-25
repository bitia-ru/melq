import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import Link from '../Link/Link';
import Icon from '../Icon/Icon';
import {
  disabledColor,
  infoColor,
  mainBgColor,
  selectedItemColor,
} from '../../theme';

const styles = StyleSheet.create({
  menuItem: {
    display: 'flex',
    ':hover': {
      backgroundColor: selectedItemColor,
      color: infoColor,
    },
  },
  menuItemSelected: { backgroundColor: selectedItemColor },
  menuItemDisabled: {
    backgroundColor: mainBgColor,
    '> svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
    ':hover': {
      backgroundColor: mainBgColor,
      '> svg': { cursor: 'not-allowed' },
      '> div': { cursor: 'not-allowed' },
    },
  },
  linkWrapper: {
    display: 'flex',
    height: '50px',
    alignItems: 'center',
    flexGrow: 1,
    transitionDuration: '300ms',
  },
  linkSelected: {
    marginLeft: '20px',
    transitionDuration: '300ms',
  },
  iconWrapper: {
    display: 'flex',
    width: '64px',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '40px',
  },
});

const MenuItemLayout = ({ id, link, icon, disabled }) => (
  <div
    className={
      css(
        styles.menuItem,
        link.selected && styles.menuItemSelected,
        disabled && styles.menuItemDisabled,
      )}
  >
    <div
      className={
        css(
          styles.linkWrapper,
          link.selected && styles.linkSelected,
        )
      }
    >
      <Link
        disabled={disabled}
        isWaiting={link.isWaiting}
        onTriggered={() => link.onTriggered('link', id)}
        linkStyle={link.linkStyle}
        size={link.size}
        selected={link.selected}
      >
        <span>{link.title}</span>
      </Link>
    </div>
    <div className={css(styles.iconWrapper)}>
      <Icon
        src={icon.src}
        onTriggered={() => icon.onTriggered('icon', id)}
        disabled={disabled}
        isWaiting={icon.isWaiting}
        width={icon.width}
        height={icon.height}
        tooltipText={icon.tooltipText}
        tooltipSide={icon.tooltipSide}
      />
    </div>
  </div>
);

MenuItemLayout.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
  link: PropTypes.object,
  icon: PropTypes.object,
};

export default MenuItemLayout;
