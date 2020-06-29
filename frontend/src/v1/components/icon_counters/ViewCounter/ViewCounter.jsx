import React from 'react';
import PropTypes from 'prop-types';
import Counter from '@/v1/components/Counter/Counter';

const ViewCounter = ({
  disabled,
  hoverable,
  value,
  tooltipText,
  tooltipSide,
}) => (
  <Counter
    src={`${require('./assets/view.svg')}#view`}
    disabled={disabled}
    hoverable={hoverable}
    width={24}
    height={16}
    value={value}
    tooltipText={tooltipText || 'Просмотрено'}
    tooltipSide={tooltipSide || 'bottom'}
  />
);

ViewCounter.propTypes = {
  disabled: PropTypes.bool,
  hoverable: PropTypes.bool,
  value: PropTypes.number.isRequired,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default ViewCounter;
