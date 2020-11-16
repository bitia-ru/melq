import React, { useState } from 'react';
import CommentBlock from '../components/CommentBlock/CommentBlock';
import CommentContext from '@/v1/contexts/CommentContext';

const comments = {
  3: {
    id: 3,
    post_slug: 'slug',
    comment_id: null,
    user_id: 1,
    content: 'text',
    author_name: 'comment',
    author_url: null,
    hidden: false,
    created_at: '2020-08-10T08:06:36.490Z',
    updated_at: '2020-08-10T08:06:36.490Z',
  },
  4: {
    id: 4,
    post_slug: 'slug',
    comment_id: null,
    user_id: 1,
    content: 'test',
    author_name: 'test',
    author_url: null,
    hidden: false,
    created_at: '2020-08-07T15:47:06.781Z',
    updated_at: '2020-08-07T15:47:06.781Z',
  },
  5: {
    id: 5,
    post_slug: 'slug',
    comment_id: 4,
    user_id: 1,
    content: 'test_test',
    author_name: 'test_test',
    author_url: null,
    hidden: false,
    created_at: '2020-08-07T15:47:06.781Z',
    updated_at: '2020-08-07T15:47:06.781Z',
  },
};

const isWaiting = false;

const user = {
  id: 1,
  email: '1@email.ru',
  password_digest: '',
  created_at: '2020-07-12T08:56:28.605Z',
  updated_at: '2020-07-12T08:56:28.605Z',
};

const CommentBlockExample = () => {
  const [responseToCommentId, setResponseToCommentId] = useState(null);

  const [currentComment, setCurrentComment] = useState(
    {
      author_name: '',
      content: '',
    },
  );
  const [formState, setFormState] = useState('fills');

  const answer = (commentId) => {
    setResponseToCommentId(commentId);
    setCurrentComment(
      {
        author_name: '',
        content: '',
      },
    );
    setFormState('answers');
  };

  const submit = () => console.log('submit');

  const edit = (id, parentId) => console.log(`editComment. ID: ${id}, parentId: ${parentId}`);

  const update = id => console.log(`updateComment. ID: ${id}`);

  const remove = id => console.log(`removeComment. ID: ${id}`);

  const onChange = (fieldName, fieldValue) => {
    setCurrentComment({
      ...currentComment,
      [fieldName]: fieldValue,
    });
  };

  const onLikeClick = () => console.log('On like click');

  return (
    <CommentContext.Provider
      value={{
        answer,
        update,
        submit,
        edit,
        remove,
        onLikeClick,
      }}
    >
      <CommentBlock
        postSlug="slug"
        comments={comments}
        user={user}
        width="960px"
        onChange={onChange}
        isWaiting={isWaiting}
        responseToCommentId={responseToCommentId}
        currentComment={currentComment}
        formState={formState}
      />
    </CommentContext.Provider>
  );
};

export default CommentBlockExample;
