import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CommentLayout from './CommentLayout';
import CommentContext from '@/v1/contexts/CommentContext';

const Comment = ({
  comment,
  user,
}) => {
  const { answer, edit, update, remove, onLikeClick } = useContext(CommentContext);

  const changeHiddenProp = (commentId) => {
    update(
      commentId,
      { comment: { hidden: !comment.hidden } },
    );
  };

  return (
    <CommentLayout
      comment={comment}
      editCommentContent={edit}
      removeCommentBranch={remove}
      changeHiddenProp={changeHiddenProp}
      onLikeClick={onLikeClick}
      answer={answer}
      user={user}
    />
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
};

export default Comment;
