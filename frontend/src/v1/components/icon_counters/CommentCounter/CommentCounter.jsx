import React from 'react';
import PropTypes from 'prop-types';
import Counter from '@/v1/components/Counter/Counter';

const CommentCounter = ({
  onClick,
  disabled,
  hoverable,
  value,
  tooltipText,
  tooltipSide,
}) => (
  <Counter
    src={`${require('./assets/comment.svg')}#comment`}
    onClick={onClick}
    disabled={disabled}
    hoverable={hoverable}
    width={24}
    height={25}
    value={value}
    tooltipText={tooltipText || 'Комментарий'}
    tooltipSide={tooltipSide || 'bottom'}
  />
);

CommentCounter.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  hoverable: PropTypes.bool,
  value: PropTypes.number.isRequired,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};
export default CommentCounter;
