import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhotoPreviewLayout from './PhotoPreviewLayout';

const PhotoPreview = ({ src, remove, title, onTitleChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const finishEditTitle = () => {
    setEditMode(false);
    onTitleChange(currentTitle);
  };

  const onKeyDown = (e) => {
    if (!editMode && e.keyCode === 13) {
      setEditMode(true);
    }
    if (editMode && e.keyCode === 13) {
      finishEditTitle();
    }
  };

  return (
    <PhotoPreviewLayout
      src={src}
      remove={remove}
      title={currentTitle}
      editMode={editMode}
      onKeyDown={onKeyDown}
      onTitleChange={e => setCurrentTitle(e.target.value)}
      startEditTitle={() => setEditMode(true)}
      finishEditTitle={finishEditTitle}
    />
  );
};

PhotoPreview.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  onTitleChange: PropTypes.func,
  remove: PropTypes.func.isRequired,
};

export default PhotoPreview;
