import React from 'react';
import PropTypes from 'prop-types';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import { StyleSheet, css } from '@/v1/aphrodite';
import { themeStyles } from '@/v1/theme';

const styles = StyleSheet.create({
  icon: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '24px 24px',
    width: 24,
    height: 24,
    display: 'inline-block',
    outlineOffset: 1,
  },
  iconDisabled: {
    cursor: 'not-allowed',
    ':hover': { transform: 'scale(1)' },
  },
  clickable: {
    cursor: 'pointer',
    ':hover': { transform: 'scale(1.2)' },
  },
});

const SocialLinkLayout = ({
  icon,
  disabledIcon,
  disabled,
  onClick,
  onKeyDown,
  tooltipText,
  tooltipSide,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>{content}</Tooltip>
      )
    }
  >
    <div
      tabIndex={disabled || !onClick ? -1 : 0}
      role="button"
      onClick={onClick || null}
      onKeyDown={onKeyDown}
      className={
        css(
          styles.icon,
          !disabled && themeStyles.focusable,
          onClick && styles.clickable,
          disabled && styles.iconDisabled,
        )
      }
      style={{ backgroundImage: `url('${disabled ? disabledIcon : icon}')` }}
    />
  </ConditionalWrapper>
);

SocialLinkLayout.propTypes = {
  icon: PropTypes.string,
  disabledIcon: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default SocialLinkLayout;
