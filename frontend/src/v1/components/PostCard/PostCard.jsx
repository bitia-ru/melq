import React from 'react';
import PropTypes from 'prop-types';
import PostCardLayout from './PostCardLayout';

const PostCard = ({ post, onClick, disabledCounter }) => {
  const getDisabled = (key) => {
    if (typeof disabledCounter === 'boolean') {
      return disabledCounter;
    }
    return disabledCounter[key];
  };

  return (
    <PostCardLayout post={post} onClick={onClick} getDisabled={getDisabled} />
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabledCounter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default PostCard;
