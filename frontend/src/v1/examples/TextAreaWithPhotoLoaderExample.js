import React, { useState } from 'react';
import { StyleSheet, css } from '../aphrodite';
import TextAreaWithPhotoLoader from '@/v1/components/TextAreaWithPhotoLoader/TextAreaWithPhotoLoader';

const styles = StyleSheet.create({
  container: {
    width: 842,
    margin: 10,
  },
});

const TextAreaWithPhotoLoaderExample = () => {
  const [text, setText] = useState(null);

  const onLoadPhoto = (file) => {
    console.log(file);
  };

  const onRemovePhoto = (index) => {
    console.log(index);
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={css(styles.container)}>
      <TextAreaWithPhotoLoader
        placeholder="Введите текст анонса"
        tooltipText="Введите текст анонса"
        tooltipSide="bottom"
        text={text}
        onChange={onChange}
        onLoadPhoto={onLoadPhoto}
        onRemovePhoto={onRemovePhoto}
      />
    </div>
  );
};

export default TextAreaWithPhotoLoaderExample;
