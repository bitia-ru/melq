import React from 'react';
import PropTypes from 'prop-types';
import CommentBlockLayout from './CommentBlockLayout';
import getCommentsTreeOfPost from '@/v1/utils/getCommentsTreeOfPost';

const CommentBlock = ({
  postSlug,
  comments,
  user,
  width,
  onChange,
  isWaiting,
  responseToCommentId,
  currentComment,
  formState,
}) => (
  <CommentBlockLayout
    comments={getCommentsTreeOfPost(postSlug, comments)}
    user={user}
    width={width}
    onChange={onChange}
    isWaiting={isWaiting}
    responseToCommentId={responseToCommentId}
    currentComment={currentComment}
    formState={formState}
  />
);

CommentBlock.propTypes = {
  postSlug: PropTypes.string,
  comments: PropTypes.object,
  user: PropTypes.object,
  width: PropTypes.string,
  onChange: PropTypes.func,
  isWaiting: PropTypes.bool,
  responseToCommentId: PropTypes.number,
  currentComment: PropTypes.object,
  formState: PropTypes.string,
};

export default CommentBlock;
