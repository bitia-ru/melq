import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import CommentForm from '@/v1/components/CommentForm/CommentForm';
import Comment from '@/v1/components/Comment/Comment';

const styles = StyleSheet.create({ container: { marginLeft: '48px' } });

class CommentBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { responseToCommentId: null };
  }

  answer = (commentId) => {
    this.setState({ responseToCommentId: commentId });
  }

  renderComments = comments => (
    <>
      {
        R.map(
          comment => (
            <div key={comment.id}>
              <Comment comment={comment} answer={this.answer} />
              {
                this.state.responseToCommentId === comment.id && (
                  <CommentForm
                    responseToCommentId={this.state.responseToCommentId}
                    afterSubmit={() => this.setState({ responseToCommentId: null })}
                  />
                )
              }
              <div className={css(styles.container)}>
                {
                  this.renderComments(comment.comments)
                }
              </div>
            </div>
          ),
          comments,
        )
      }
    </>
  )

  render() {
    return (
      <>
        <CommentForm />
        {
          this.renderComments(this.props.comments)
        }
      </>
    );
  }
}

CommentBlock.propTypes = { comments: PropTypes.array };

CommentBlock.defaultProps = { comments: [] };

export default CommentBlock;
