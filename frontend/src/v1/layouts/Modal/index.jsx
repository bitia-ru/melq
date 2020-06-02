import React from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../modules/modalable';
import { StyleSheet, css } from '@/v1/aphrodite';
import styles from './index.module.css';


const onClick = (event) => {
  event.stopPropagation();
};

const Modal = ({ maxWidth, maxHeight, controls, children }) => (
  <ModalContext.Consumer>
    {
      ({ closeModal }) => (
        <div
          className={styles.modal}
          onClick={onClick}
        >
          <div className={styles.controlsContainer}>
            <button
              type="button"
              className={styles.close}
              onClick={closeModal}
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

const maxWidthStyle = (width) => (
  StyleSheet.create({ maxWidth: { width: '100%', maxWidth: width } }).maxWidth
);

const maxHeightStyle = (height) => (
  StyleSheet.create({ maxHeight: { height: '100%', maxheight: height } }).maxHeight
);

export default Modal;
