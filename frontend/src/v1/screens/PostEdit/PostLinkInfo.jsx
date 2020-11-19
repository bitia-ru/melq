import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import CardLayout from '../../layouts/CardLayout';
import CopyLinkButton from '../../components/icon_buttons/CopyLinkButton/CopyLinkButton';

import { css, StyleSheet } from '../../aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputWrapper: {
    width: '368px',
    marginRight: '8px',
  },
});

const PostLinkInfo = ({ link }) => {
  const [inputRef, setInputRef] = useState(undefined);

  return (
    <CardLayout title="Ссылка на пост">
      <div className={css(styles.container)}>
        <div className={css(styles.inputWrapper)}>
          <Input
            setInputRef={setInputRef}
            input={{ value: link }}
            placeholder="Адрес ссылки на пост"
          />
        </div>
        <span>
          <CopyLinkButton
            onTriggered={
              () => {
                inputRef.select();
                document.execCommand('copy');
              }
            }
          />
        </span>
      </div>
    </CardLayout>
  );
};

PostLinkInfo.propTypes = { link: PropTypes.string };

export default PostLinkInfo;
