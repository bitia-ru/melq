import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import Comment from '@/v1/components/Comment/Comment';
import CommentForm from '@/v1/components/CommentForm/CommentForm';
import { bgColor, themeStyles } from '../../theme';

const styles = StyleSheet.create({
  commentBlockContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '960px',
    background: bgColor,
  },
  commentBlockContent: {
    margin: '35px 57px 35px 62px',
  },
  commentCount: { margin: '0px auto 26px 0px' },
  commentTreeIndent: {
    marginLeft: '58px',
    marginTop: '22px',
  },
  answerCommentFormRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  answerCommentFormWrapper: {
    width: 'calc(100% - 58px)',
    marginTop: '13px',
  },
});

const CommentBlockLayout = ({
  comments,
  user,
  width,
  onChange,
  isWaiting,
  responseToCommentId,
  currentComment,
  formState,
}) => {
  const renderComments = commentsList => (
    <>
      {
        R.map(
          comment => (
            <div key={comment.id}>
              <Comment
                comment={comment}
                user={user}
              />
              {
                ((responseToCommentId === comment.id && formState === 'answers')
                || (currentComment.id === comment.id && formState === 'edits'))
                && (
                  <div className={css(styles.answerCommentFormRow)}>
                    <div className={css(styles.answerCommentFormWrapper)}>
                      <CommentForm
                        onChange={onChange}
                        isWaiting={isWaiting}
                        currentComment={currentComment}
                        formState={formState}
                      />
                    </div>
                  </div>
                )
              }
              <div className={css(styles.commentTreeIndent)}>
                {
                  renderComments(comment.comments)
                }
              </div>
            </div>
          ),
          commentsList,
        )
      }
    </>
  );

  const ending = (numOfComments) => {
    if (numOfComments % 10 === 1 && numOfComments % 100 !== 11) {
      return 'й';
    }
    if (!(numOfComments % 10 >= 2 && numOfComments % 10 <= 4)) {
      return 'ев';
    }
    if (!(numOfComments % 100 < 12 || numOfComments % 100 > 14)) {
      return 'ев';
    }
    return 'я';
  };

  return (
    <div
      style={{ width }}
      className={css(styles.commentBlockContainer)}
    >
      <div className={css(styles.commentBlockContent)}>
        <div className={css(styles.commentCount, themeStyles.headerFont)}>
          { comments.length }
          {' '}
          комментари
          {ending(comments.length)}
        </div>
        {
          formState === 'fills' && (
            <CommentForm
              onChange={onChange}
              isWaiting={isWaiting}
              currentComment={currentComment}
              formState={formState}
            />
          )
        }
        {
          renderComments(comments)
        }
      </div>
    </div>
  );
};

CommentBlockLayout.propTypes = {
  comments: PropTypes.array,
  user: PropTypes.object,
  width: PropTypes.string,
  onChange: PropTypes.func,
  isWaiting: PropTypes.bool,
  responseToCommentId: PropTypes.number,
  currentComment: PropTypes.object,
  formState: PropTypes.string,
};

export default CommentBlockLayout;
