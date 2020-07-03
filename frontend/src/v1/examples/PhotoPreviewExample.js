import React, { useState } from 'react';
import PhotoPreview from '@/v1/components/PhotoPreview/PhotoPreview';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({ container: { margin: 10 } });

const PhotoPreviewExample = () => {
  const [title, setTitle] = useState('file.jpg');

  const onClick = () => {
    console.log('remove');
  };

  return (
    <div className={css(styles.container)}>
      <PhotoPreview
        title={title}
        onTitleChange={setTitle}
        src={require('./images/demo_image.png')}
        remove={onClick}
      />
    </div>

  );
};

export default PhotoPreviewExample;
