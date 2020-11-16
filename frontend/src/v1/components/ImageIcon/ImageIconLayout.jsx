import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import { separatorColor } from '@/v1/theme';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';

const defaultImageIcon = `${require('./images/image.svg')}`;

const styles = StyleSheet.create({
  imageIconContainer: {
    backgroundColor: separatorColor,
    backgroundImage: `url('${defaultImageIcon}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '32px 32px',
    width: 87,
    height: 87,
    display: 'inline-block',
  },
  rounded: { borderRadius: '50%' },
  imageIcon: {
    width: 87,
    height: 87,
    minWidth: 87,
  },
  small: {
    width: 48,
    height: 48,
    minWidth: 48,
  },
});

const ImageIconLayout = ({
  src,
  size,
  tooltipText,
  tooltipSide,
  rounded,
  defaultIconSrc,
  defaultIconPosition,
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
    <div
      className={
        css(
          styles.imageIconContainer,
          size === 'small' && styles.small,
          rounded && styles.rounded,
        )
      }
      style={{
        backgroundPosition: defaultIconPosition,
        backgroundImage: defaultIconSrc && `url('${defaultIconSrc}')`,
      }}
    >
      {
        src && (
          <img
            className={
              css(
                styles.imageIcon,
                size === 'small' && styles.small,
                rounded && styles.rounded,
              )
            }
            src={src}
            alt=""
          />
        )
      }
    </div>
  </ConditionalWrapper>
);

ImageIconLayout.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  rounded: PropTypes.bool,
  defaultIconSrc: PropTypes.string,
  defaultIconPosition: PropTypes.string,
};

export default ImageIconLayout;
