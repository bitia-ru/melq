import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StyleSheet, css } from '../../aphrodite';
import AvatarRound from '@/v1/components/AvatarRound/AvatarRound';
import { notReady, notExist } from '@/v1/utils';
import { currentUser } from '@/v1/redux/user_session/utils';
import { updateComment, removeComment } from '@/v1/redux/posts/actions';

const styles = StyleSheet.create({
  container: { display: 'flex' },
  textBlock: { marginLeft: '10px' },
  infoBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  authorBlock: { fontWeight: 'bold' },
  isBlogAuthorBlock: { backgroundColor: '#D6D6D6' },
  dateBlock: {
    color: '#827070',
    marginLeft: '10px',
  },
  btnContainer: { display: 'flex' },
  btn: {
    cursor: 'pointer',
    color: '#827070',
    marginRight: '10px',
  },
});

class Comment extends React.PureComponent {
  changeHiddenProp = (commentId) => {
    const { slug } = this.props.match.params;
    this.props.updateComment(
      slug,
      commentId,
      { comment: { hidden: !this.props.comment.hidden }},
    );
  };

  removeComment = (commentId) => {
    if (confirm('Удалить комментарий?')) {
      const { slug } = this.props.match.params;
      this.props.removeComment(
        slug,
        commentId,
      );
    }
  };

  render() {
    const { comment, answer, user } = this.props;
    return (
      <div className={css(styles.container)}>
        <AvatarRound src={comment.author_url} />
        <div className={css(styles.textBlock)}>
          <div className={css(styles.infoBlock)}>
            {
              comment.user_id
                ? (
                  <div className={css(styles.isBlogAuthorBlock)}>
                    Автор блога
                  </div>
                )
                : (
                  <div className={css(styles.authorBlock)}>
                    {comment.author_name || 'Гость'}
                  </div>
                )
            }
            <div className={css(styles.dateBlock)}>
              {dayjs(comment.created_at).format('DD.MM.YYYY, HH:mm')}
            </div>
          </div>
          <div>
            {comment.content}
          </div>
          <div className={css(styles.btnContainer)}>
            <div
              role="button"
              tabIndex={0}
              className={css(styles.btn)}
              onClick={() => answer(comment.id)}
            >
              Ответить
            </div>
            {
              (notReady(user) || !notExist(user)) && (
                <>
                  <div
                    role="button"
                    tabIndex={0}
                    className={css(styles.btn)}
                    onClick={() => this.changeHiddenProp(comment.id)}
                  >
                    {comment.hidden ? 'Показать' : 'Скрыть'}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className={css(styles.btn)}
                    onClick={() => this.removeComment(comment.id)}
                  >
                    Удалить
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  match: PropTypes.object,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  answer: PropTypes.func,
  user: PropTypes.object,
  removeComment: PropTypes.func,
};

const mapStateToProps = state => ({ user: currentUser(state) });

const mapDispatchToProps = dispatch => ({
  updateComment: (postSlug, id, params, afterSuccess, afterAll) => dispatch(
    updateComment(postSlug, id, params, afterSuccess, afterAll),
  ),
  removeComment: (postSlug, id, afterSuccess, afterAll) => dispatch(
    removeComment(postSlug, id, afterSuccess, afterAll),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Comment));
