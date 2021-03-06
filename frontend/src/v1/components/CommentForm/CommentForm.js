import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormField from '@/v1/components/FormField/FormField';
import Button from '@/v1/components/Button/Button';
import { createComment } from '@/v1/redux/comments/actions';

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comment: {},
      isWaiting: false,
    };
  }

  submit = () => {
    this.setState({ isWaiting: true });
    const { slug } = this.props.match.params;
    this.props.createComment(
      slug,
      {
        comment: {
          ...this.state.comment,
          comment_id: this.props.responseToCommentId,
          post_id: this.props.posts[slug].id,
        },
      },
      () => {
        this.setState({ comment: { author_name: undefined, content: undefined } });
        this.props.afterSubmit && this.props.afterSubmit();
      },
      () => {
        this.setState({ isWaiting: false });
      },
    );
  }

  render() {
    const { comment } = this.state;
    return (
      <>
        <FormField
          placeholder="Ваше имя (необязательно)"
          id="author_name"
          onChange={
            (event) => {
              this.setState(
                {
                  comment: {
                    ...comment,
                    author_name: event.target.value,
                  },
                },
              );
            }
          }
          type="text"
          value={comment.author_name || ''}
        />
        <textarea
          placeholder="Ваш комментарий"
          onChange={
            (event) => {
              this.setState(
                {
                  comment: {
                    ...comment,
                    content: event.target.value,
                  },
                },
              );
            }
          }
          value={comment.content || ''}
        />
        <Button onClick={this.submit} isWaiting={this.state.isWaiting}>
          Отправить
        </Button>
      </>
    );
  }
}

CommentForm.propTypes = {
  match: PropTypes.object,
  createComment: PropTypes.func,
  responseToCommentId: PropTypes.number,
  afterSubmit: PropTypes.func,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({ posts: state.postsStoreV1.posts });

const mapDispatchToProps = dispatch => ({
  createComment: (postSlug, attributes, afterSuccess, afterAll) => dispatch(
    createComment(postSlug, attributes, afterSuccess, afterAll),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentForm));
