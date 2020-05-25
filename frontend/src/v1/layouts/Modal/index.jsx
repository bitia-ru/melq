import React from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../modules/modalable';
import { StyleSheet, css } from '@/v1/aphrodite';

import './index.css';


const onClick = (event) => {
  event.stopPropagation();
};

const Modal = ({ maxWidth, maxHeight, controls, children }) => (
  <ModalContext.Consumer>
    {
      ({ closeModal }) => (
        <div
          className={
            css(
              style.modal,
              maxWidth && maxWidthStyle(maxWidth),
              maxHeight && maxHeightStyle(maxHeight),
            )
          }
          onClick={onClick}
        >
          <div className={css(style.controlsContainer)}>
            <button
              type="button"
              className="close"
              onClick={closeModal}
              style={{
                width: '17px',
                height: '17px',
              }}
            />
            {controls}
          </div>
          {children}
        </div>
      )
    }
  </ModalContext.Consumer>
);

Modal.propTypes = {
  controls: PropTypes.arrayOf(PropTypes.element),
};

const style = StyleSheet.create({
  modal: {
    position: 'relative',
    margin: '20px auto',
    backgroundColor: 'white',
    padding: '0',
    color: '#393C51',
    minHeight: '64px',
  },
  controlsContainer: {
    position: 'absolute',
    content: '',
    right: '-40px',
    top: 0,
    width: '17px',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
  },
});

const maxWidthStyle = (width) => (
  StyleSheet.create({ maxWidth: { width: '100%', maxWidth: width } }).maxWidth
);

const maxHeightStyle = (height) => (
  StyleSheet.create({ maxHeight: { height: '100%', maxheight: height } }).maxHeight
);

export default Modal;
