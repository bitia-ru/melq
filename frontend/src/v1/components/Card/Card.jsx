import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles } from '@/v1/theme';


const Card = ({
  height,
  width,
  backgroundColor,
  onClick,
  children,
}) => {
  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height,
      width,
      background: backgroundColor,
      marginTop: '34px',
      marginLeft: '32px',
      ':hover': { cursor: 'pointer' },
    },
  });

  const onMouseClick = (e) => {
    onClick(e);
  };

  const onKeyPressed = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  };

  return (
    <div
      className={
        css(
          styles.card,
          themeStyles.defaultFont,
          themeStyles.hoverShadowed,
          themeStyles.focusable,
        )
      }
      tabIndex={0}
      role="button"
      onClick={onMouseClick}
      onKeyDown={onKeyPressed}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.array.isRequired,
};

export default Card;
