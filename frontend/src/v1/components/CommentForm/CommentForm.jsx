import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentFormLayout from './CommentFormLayout';
import CommentContext from '@/v1/contexts/CommentContext';

const CommentForm = ({
  onChange,
  isWaiting,
  currentComment,
  formState,
}) => {
  const [authorName, setAuthorName] = useState('Гость');
  const [commentText, setCommentText] = useState('');
  const { submit, update } = useContext(CommentContext);

  useEffect(() => {
    setAuthorName(currentComment.author_name);
    setCommentText(currentComment.content);
  }, [currentComment.author_name, currentComment.content]);

  const handleInputChange = (e) => {
    onChange('author_name', e.target.value);
  };

  const handleTextareaChange = (e) => {
    onChange('content', e.target.value);
  };

  const onClick = () => {
    if (formState === 'edits') {
      update(
        currentComment.id,
        {
          comment: {
            ...currentComment,
            author_name: currentComment.author_name || null,
          },
        },
      );
    } else {
      submit();
    }
  };

  return (
    <CommentFormLayout
      handleInputChange={handleInputChange}
      handleTextareaChange={handleTextareaChange}
      onClick={onClick}
      isWaiting={isWaiting}
      authorName={authorName}
      commentText={commentText}
    />
  );
};

CommentForm.propTypes = {
  onChange: PropTypes.func,
  isWaiting: PropTypes.bool,
  currentComment: PropTypes.object,
  formState: PropTypes.string,
};

export default CommentForm;
