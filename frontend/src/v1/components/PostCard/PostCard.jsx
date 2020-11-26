import React from 'react';
import PropTypes from 'prop-types';
import PostCardLayout from './PostCardLayout';

const PostCard = ({ data, onClick, disabledCounter }) => {
  const getDisabled = (key) => {
    if (typeof disabledCounter === 'boolean') {
      return disabledCounter;
    }
    return disabledCounter[key];
  };

  return (
    <PostCardLayout data={data} onClick={onClick} getDisabled={getDisabled} />
  );
};

PostCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabledCounter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default PostCard;
