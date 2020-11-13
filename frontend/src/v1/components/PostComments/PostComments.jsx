import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentBlock from '@/v1/components/CommentBlock/CommentBlock';
import { currentUser } from '@/v1/redux/user_session/utils';
import {
  createComment as createCommentAction,
  updateComment as updateCommentAction,
  removeComment as removeCommentAction,
} from '@/v1/redux/comments/actions';
import CommentContext from '@/v1/contexts/CommentContext';

const PostComments = ({
  match,
  createComment,
  updateComment,
  removeComment,
  user,
  comments,
}) => {
  const [currentComment, setCurrentComment] = useState({ author_name: '', content: '' });
  const [isWaiting, setIsWaiting] = useState(false);
  const [responseToCommentId, setResponseToCommentId] = useState(null);
  const [formState, setFormState] = useState('fills');

  const { slug } = match.params;

  const clearCurrentCommentState = () => {
    setCurrentComment({
      author_name: '',
      content: '',
    });
  };

  const afterSubmit = () => {
    clearCurrentCommentState();
    setResponseToCommentId(null);
    setFormState('fills');
  };

  const answer = (commentId) => {
    setResponseToCommentId(commentId);
    setFormState('answers');
    clearCurrentCommentState();
  };

  const edit = (id, parentId) => {
    setResponseToCommentId(null);
    setFormState('edits');
    setCurrentComment({
      ...comments[id],
      comment_id: parentId,
    });
  };

  const update = (commentId, attributes) => {
    setIsWaiting(true);
    updateComment(
      commentId,
      attributes,
      () => {
        afterSubmit();
      },
      () => {
        setIsWaiting(false);
      },
    );
  };

  const submit = () => {
    setIsWaiting(true);
    createComment(
      {
        comment: {
          ...currentComment,
          comment_id: responseToCommentId,
          post_slug: slug,
          author_name: currentComment.author_name || null,
        },
      },
      () => {
        afterSubmit();
      },
      () => {
        setIsWaiting(false);
      },
    );
  };

  const remove = (id) => {
    if (confirm('Удалить комментарий?')) {
      removeComment(
        id,
        () => {
          afterSubmit();
        },
      );
    }
  };

  const onChange = (fieldName, fieldValue) => {
    setCurrentComment({ ...currentComment, [fieldName]: fieldValue });
  };

  const onLikeClick = () => {
    console.log('On like click');
  };

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
        postSlug={slug}
        comments={comments}
        user={user}
        onChange={onChange}
        isWaiting={isWaiting}
        responseToCommentId={responseToCommentId}
        currentComment={currentComment}
        formState={formState}
      />
    </CommentContext.Provider>
  );
};

PostComments.propTypes = {
  slug: PropTypes.string,
  match: PropTypes.object,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  removeComment: PropTypes.func,
  posts: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: state.postsStoreV1.posts,
  user: currentUser(state),
  comments: state.commentsStoreV1.comments,
});

const mapDispatchToProps = dispatch => ({
  createComment: (attributes, afterSuccess, afterAll) => dispatch(
    createCommentAction(attributes, afterSuccess, afterAll),
  ),
  updateComment: (id, attributes, afterSuccess, afterAll) => dispatch(
    updateCommentAction(id, attributes, afterSuccess, afterAll),
  ),
  removeComment: (id, afterSuccess, afterAll) => dispatch(
    removeCommentAction(id, afterSuccess, afterAll),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostComments));
