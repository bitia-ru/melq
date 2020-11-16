import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import AvatarRound from '@/v1/components/AvatarRound/AvatarRound';
import { StyleSheet, css } from '../../aphrodite';
import {
  dateTopicCounterColor,
  selectedItemColor,
  defaultColor,
  themeStyles,
} from '@/v1/theme';
import LikeCounter from '@/v1/components/icon_counters/LikeCounter/LikeCounter';
import EditButton from '@/v1/components/icon_buttons/EditButton/EditButton';
import TrashButton from '@/v1/components/icon_buttons/TrashButton/TrashButton';
import HideButton from '@/v1/components/icon_buttons/HideButton/HideButton';
import { notReady, notExist } from '@/v1/utils';
import author from '../../Constants/blogAuthor';

const styles = StyleSheet.create({
  container: { display: 'flex' },
  textBlock: {
    marginLeft: '10px',
    flexGrow: 1,
  },
  infoBlock: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  isBlogAuthorBlock: {
    backgroundColor: selectedItemColor,
    marginLeft: 8,
    width: 96,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateBlock: {
    color: dateTopicCounterColor,
    marginLeft: 16,
  },
  btnContainer: { marginTop: 8, display: 'flex' },
  btn: {
    cursor: 'pointer',
    color: defaultColor,
    marginRight: '10px',
  },
  content: {
    marginTop: 7,
    width: '100%',
    overflowWrap: 'anywhere',
  },
  likes: { marginLeft: 23 },
  iconBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: '10px 0px 14px 32px',
    width: 25,
  },
});

const CommentLayout = ({
  comment,
  editCommentContent,
  removeCommentBranch,
  changeHiddenProp,
  onLikeClick,
  answer,
  user,
}) => {
  const getName = () => {
    if (comment.user_id) { return author.name; }

    return comment.author_name || 'Гость';
  };

  const getAvatarUrl = () => {
    if (comment.user_id) { return author.avatarUrl; }

    return comment.author_url;
  };

  return (
    <div className={css(styles.container)}>
      <AvatarRound src={getAvatarUrl()} size="small" />
      <div className={css(styles.textBlock)}>
        <div className={css(styles.infoBlock)}>
          <div className={css(themeStyles.lgLineHeightHeaderFont)}>
            {getName()}
          </div>
          {
            comment.user_id && (
              <div
                className={
                  css(
                    styles.isBlogAuthorBlock,
                    themeStyles.smallFont,
                    themeStyles.bordered,
                  )
                }
              >
                Автор блога
              </div>
            )
          }
          <div className={css(styles.dateBlock, themeStyles.smallFont)}>
            {dayjs(comment.created_at).format('DD.MM.YYYY, HH:mm')}
          </div>
        </div>
        <div className={css(styles.content, themeStyles.lgLineHeightFont)}>
          {comment.content}
        </div>
        <div className={css(styles.btnContainer)}>
          <div
            role="button"
            tabIndex={0}
            className={css(styles.btn, themeStyles.defaultFont)}
            onClick={() => answer(comment.id)}
          >
            Ответить
          </div>
          <div className={css(styles.likes)}>
            <LikeCounter value={comment.num_of_likes || 0} size="small" onClick={onLikeClick} />
          </div>
        </div>
      </div>
      <div className={css(styles.iconBlock)}>
        {
          (notReady(user) || !notExist(user)) && (
            <>
              {
                comment.user_id === user.id && (
                  <EditButton
                    onTriggered={() => editCommentContent(comment.id, comment.comment_id)}
                  />
                )
              }
              <TrashButton onTriggered={() => removeCommentBranch(comment.id)} />
              <HideButton
                onTriggered={() => changeHiddenProp(comment.id)}
                switchedOn={!comment.hidden}
              />
            </>
          )
        }
      </div>
    </div>
  );
}

CommentLayout.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.object.isRequired,
  editCommentContent: PropTypes.func,
  removeCommentBranch: PropTypes.func,
  changeHiddenProp: PropTypes.func,
  onLikeClick: PropTypes.func,
  answer: PropTypes.func,
};

export default CommentLayout;
