import React from 'react';
import PropTypes from 'prop-types';
import Counter from '@/v1/components/Counter/Counter';

const ShareCounter = ({
  onClick,
  disabled,
  hoverable,
  value,
  tooltipText,
  tooltipSide,
}) => (
  <Counter
    src={`${require('./assets/share.svg')}#share`}
    onClick={onClick}
    disabled={disabled}
    hoverable={hoverable}
    width={30}
    height={24}
    value={value}
    tooltipText={tooltipText || 'Поделиться'}
    tooltipSide={tooltipSide || 'bottom'}
  />
);

ShareCounter.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  hoverable: PropTypes.bool,
  value: PropTypes.number.isRequired,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default ShareCounter;
