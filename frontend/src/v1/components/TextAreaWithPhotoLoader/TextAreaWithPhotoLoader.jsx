import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import TextAreaWithPhotoLoaderLayout from './TextAreaWithPhotoLoaderLayout';

const TextAreaWithPhotoLoader = ({
  text,
  placeholder,
  tooltipText,
  tooltipSide,
  onChange,
  onLoadPhoto,
  onRemovePhoto,
  defaultPhotos,
}) => {
  let fileReader;
  const [fileInputRef, setFileInputRef] = useState(null);
  const [photos, setPhotos] = useState(defaultPhotos);

  const onFileRead = (file) => {
    setPhotos([...photos, { file, src: fileReader.result }]);
    onLoadPhoto(file);
  };

  const onFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = () => onFileRead(file);
    fileReader.readAsDataURL(file);
  };

  const removePhoto = (index) => {
    setPhotos(R.remove(index, 1, photos));
    onRemovePhoto(index);
  };

  return (
    <TextAreaWithPhotoLoaderLayout
      text={text}
      photos={photos}
      onChange={onChange}
      placeholder={placeholder}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
      fileInputRef={fileInputRef}
      setFileInputRef={setFileInputRef}
      onFileChosen={onFileChosen}
      removePhoto={removePhoto}
    />
  );
};

TextAreaWithPhotoLoader.defaultProps = { defaultPhotos: [] };

TextAreaWithPhotoLoader.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onLoadPhoto: PropTypes.func,
  onRemovePhoto: PropTypes.func,
  defaultPhotos: PropTypes.array,
};

export default TextAreaWithPhotoLoader;
