import React from 'react';
import PropTypes from 'prop-types';
import Counter from '@/v1/components/Counter/Counter';

const LikeCounter = ({
  onClick,
  disabled,
  checked,
  hoverable,
  value,
  tooltipText,
  tooltipSide,
}) => (
  <Counter
    src={`${require('./assets/like.svg')}#like`}
    onClick={onClick}
    disabled={disabled}
    checked={checked}
    hoverable={hoverable}
    width={24}
    height={22}
    value={value}
    tooltipText={tooltipText || 'Нравится'}
    tooltipSide={tooltipSide || 'bottom'}
  />
);

LikeCounter.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  hoverable: PropTypes.bool,
  value: PropTypes.number,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default LikeCounter;
