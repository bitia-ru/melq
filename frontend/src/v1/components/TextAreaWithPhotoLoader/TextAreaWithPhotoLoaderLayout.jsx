import React from 'react';
import PropTypes from 'prop-types';
import autosize from 'autosize';
import * as R from 'ramda';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles, focusBorderColor, defaultColor, mainFontColor } from '@/v1/theme';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import PhotoPreview from '@/v1/components/PhotoPreview/PhotoPreview';

const mapIndexed = R.addIndex(R.map);

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${focusBorderColor}`,
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: 48,
    display: 'inline-block',
  },
  text: {
    paddingLeft: 20,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 40,
    display: 'inline-block',
    outline: 'none',
    border: 'none',
    background: 'transparent',
    boxSizing: 'border-box',
    width: '100%',
    overflow: 'auto',
    textAlign: 'start',
    color: mainFontColor,
    ':placeholder': { color: defaultColor },
  },
  addPhotoIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: 15,
    top: 15,
    outline: 'none',
    '> svg': { fill: defaultColor },
  },
  photosContainer: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'start',
    marginLeft: 13,
    marginTop: 19,
    marginBottom: 13,
  },
  photoContainer: {
    display: 'inline-block',
    marginRight: 10,
  },
});

const TextAreaWithPhotoLoaderLayout = ({
  fileInputRef,
  setFileInputRef,
  onFileChosen,
  onChange,
  text,
  photos,
  removePhoto,
  placeholder,
  tooltipText,
  tooltipSide,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>
          {content}
        </Tooltip>
      )
    }
  >
    <div className={css(styles.container, themeStyles.bordered)}>
      <textarea
        ref={
          (ref) => {
            autosize(ref);
            const textareaRef = ref;
            if (ref) {
              textareaRef.style.resize = 'none';
            }
          }
        }
        value={text}
        onChange={onChange}
        className={css(styles.text, themeStyles.smallFont)}
        placeholder={placeholder}
      />
      <div
        role="button"
        tabIndex={0}
        className={css(styles.addPhotoIcon)}
        onClick={() => fileInputRef.click()}
      >
        <svg width={16} height={16}>
          <use xlinkHref={`${require('./images/photo.svg')}#photo`} />
        </svg>
      </div>
      {
        !R.isEmpty(photos) && (
          <div className={css(styles.photosContainer)}>
            {
              mapIndexed(
                (photo, index) => (
                  <div key={index} className={css(styles.photoContainer)}>
                    <PhotoPreview src={photo.src} remove={() => removePhoto(index)} />
                  </div>
                ),
                photos,
              )
            }
          </div>
        )
      }
    </div>
    <input
      type="file"
      hidden
      ref={ref => setFileInputRef(ref)}
      onChange={event => onFileChosen(event.target.files[0])}
    />
  </ConditionalWrapper>
);

TextAreaWithPhotoLoaderLayout.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  fileInputRef: PropTypes.object,
  setFileInputRef: PropTypes.func,
  onFileChosen: PropTypes.func,
  photos: PropTypes.array,
  removePhoto: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaWithPhotoLoaderLayout;
