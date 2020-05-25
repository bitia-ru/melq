import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const CloseButton = ({
  onClick,
}) => (
  <button
    className={css(styles.close)}
    type="button"
    onClick={onClick}
  />
);

const styles = StyleSheet.create({
  close: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    border: '0',
    boxShadow: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%3Crect%20width%3D%222.40413%22%20height%3D%2221.6372%22%20transform%3D%22matrix%280.707111%20-0.707103%200.707111%200.707103%200.142578%201.8418%29%22%20fill%3D%22%23C4C4C4%22/%3E%0A%3Crect%20width%3D%222.40413%22%20height%3D%2221.6372%22%20transform%3D%22matrix%280.707111%200.707103%20-0.707111%200.707103%2015.4419%200.140625%29%22%20fill%3D%22%23C4C4C4%22/%3E%0A%3C/svg%3E%0A")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transition: 'opacity .4s ease-out',
    ':hover': {
      opacity: '.6',
    },
  },
});

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
