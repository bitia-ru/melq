import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

import Input from '@/v1/components/Input/Input';
import Button from '@/v1/components/Button/Button';
import { StyleSheet, css } from '../../aphrodite';
import FacebookIcon from '../social_links/FacebookIcon/FacebookIcon';
import GoogleIcon from '../social_links/GoogleIcon/GoogleIcon';
import VKIcon from '../social_links/VKIcon/VKIcon';
import { bgColor, defaultColor, focusBorderColor, themeStyles, mainFontColor } from '../../theme';

const styles = StyleSheet.create({
  commentForm: {},
  inputSocialLinksContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  commentFormInputWrapper: {
    width: '268px',
    marginBottom: '8px',
    display: 'flex',
  },
  socialLinks: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginRight: '24px',
    background: bgColor,
    color: defaultColor,
  },
  socialIconWrapper: {
    width: '120px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textareaBtnContainer: {
    border: `1px solid ${focusBorderColor}`,
    width: '100%',
    minHeight: '105px',
    marginBottom: '30px',
  },
  textarea: {
    resize: 'none',
    outline: 'none',
    marginLeft: '2px',
    paddingLeft: '28px',
    paddingTop: '20px',
    border: 'none',
    width: 'calc(100% - 4px)',
    paddingRight: '28px',
    boxSizing: 'border-box',
    marginRight: '2px',
    minHeight: '50px',
    color: mainFontColor,
    '::placeholder': {
      align: 'center',
      color: defaultColor,
      fontFamily: 'GilroyRegular',
      fontSize: '14px',
    },
  },
  btnRowWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '149px',
    margin: '8px',
  },
});

const CommentFormLayout = ({
  handleInputChange,
  handleTextareaChange,
  onClick,
  isWaiting,
  authorName,
  commentText,
}) => (
  <>
    <div className={css(styles.inputSocialLinksContainer)}>
      <div className={css(styles.commentFormInputWrapper)}>
        <Input
          size="small"
          fontSize="large"
          input={{ value: authorName, onChange: handleInputChange }}
          placeholder="Ваше имя (необязательно)"
        />
      </div>
      <div className={css(themeStyles.defaultFont, styles.socialLinks)}>
        Можно авторизоваться
      </div>
      <div className={css(styles.socialIconWrapper)}>
        <GoogleIcon />
        <VKIcon />
        <FacebookIcon />
      </div>
    </div>
    <div className={css(styles.textareaBtnContainer, themeStyles.bordered)}>
      <TextareaAutosize
        className={css(themeStyles.defaultFont, styles.textarea)}
        placeholder="Ваш комментарий"
        onChange={handleTextareaChange}
        value={commentText || ''}
      />
      {
        commentText && (
          <div className={css(styles.btnRowWrapper)}>
            <div className={css(styles.btnWrapper)}>
              <Button
                onClick={onClick}
                isWaiting={isWaiting}
                btnStyle="info"
                tooltipText="Отправить сообщение"
                tooltipSide="right"
                size="big"
              >
                Отправить
              </Button>
            </div>
          </div>
        )
      }
    </div>
  </>
);

CommentFormLayout.propTypes = {
  handleInputChange: PropTypes.func,
  handleTextareaChange: PropTypes.func,
  onClick: PropTypes.func,
  isWaiting: PropTypes.bool,
  authorName: PropTypes.string,
  commentText: PropTypes.string,
};

export default CommentFormLayout;
