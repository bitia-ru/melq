import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import SmallCloseButton from '@/v1/components/icon_buttons/SmallCloseButton/SmallCloseButton';
import { themeStyles } from '@/v1/theme';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'inline-block',
    lineHeight: '14px',
  },
  img: { maxHeight: 125 },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  input: {
    border: '0.5px solid #C7C7E2',
    outline: 'none',
  },
  titleContainer: {
    marginTop: -6,
    height: 20,
  },
});

const PhotoPreviewLayout = ({
  src,
  remove,
  title,
  onTitleChange,
  startEditTitle,
  finishEditTitle,
  editMode,
  onKeyDown,
}) => (
  <>
    <div className={css(styles.container)}>
      <img src={src} alt="" className={css(styles.img, themeStyles.bordered)} />
      <div className={css(styles.removeBtn)}>
        <SmallCloseButton onTriggered={remove} />
      </div>
    </div>
    {
      title !== undefined && (
        <>
          {
            editMode
              ? (
                <div onBlur={finishEditTitle} className={css(styles.titleContainer)}>
                  <input
                    ref={ref => ref && ref.focus()}
                    onChange={onTitleChange}
                    className={css(styles.input, themeStyles.smallFont)}
                    size={title.length}
                    value={title}
                    onKeyDown={onKeyDown}
                  />
                </div>
              )
              : (
                <div onDoubleClick={startEditTitle} className={css(styles.titleContainer)}>
                  <span
                    role="button"
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    className={css(themeStyles.focusable, themeStyles.smallFont)}
                  >
                    {title}
                  </span>
                </div>
              )
          }
        </>
      )
    }
  </>
);

PhotoPreviewLayout.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  onTitleChange: PropTypes.func,
  remove: PropTypes.func.isRequired,
  startEditTitle: PropTypes.func,
  finishEditTitle: PropTypes.func,
  editMode: PropTypes.bool,
  onKeyDown: PropTypes.func,
};

export default PhotoPreviewLayout;
