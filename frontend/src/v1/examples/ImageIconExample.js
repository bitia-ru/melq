import React, { useState } from 'react';
import ImageIcon from '@/v1/components/ImageIcon/ImageIcon';
import { StyleSheet, css } from '../aphrodite';

const styles = StyleSheet.create({
  imageIconWrapper: {
    display: 'inline-block',
    margin: 10,
  },
});

const ImageIconExample = () => {
  const [size, setSize] = useState(null);

  return (
    <>
      <div>
        Small
        <input
          type="checkbox"
          onClick={() => setSize(size === 'small' ? null : 'small')}
          checked={size === 'small'}
        />
      </div>
      <div className={css(styles.imageIconWrapper)}>
        <ImageIcon
          tooltipText="ImageIcon when no image set"
          tooltipSide="bottom"
          size={size}
        />
      </div>
      <div className={css(styles.imageIconWrapper)}>
        <ImageIcon
          tooltipText="Round ImageIcon when no image set"
          tooltipSide="bottom"
          rounded
          size={size}
        />
      </div>
      <div className={css(styles.imageIconWrapper)}>
        <ImageIcon
          src={require('./images/demo_image_icon.jpg')}
          tooltipText="ImageIcon with image set"
          tooltipSide="bottom"
          size={size}
        />
      </div>
      <div className={css(styles.imageIconWrapper)}>
        <ImageIcon
          src={require('./images/demo_image_icon.jpg')}
          tooltipText="Round ImageIcon with image set"
          tooltipSide="bottom"
          rounded
          size={size}
        />
      </div>
    </>
  );
};

export default ImageIconExample;
