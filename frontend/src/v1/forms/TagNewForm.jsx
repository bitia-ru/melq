import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Modal from '../layouts/Modal';
import ImageIcon from '../components/ImageIcon/ImageIcon';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

import { ModalContext } from '../modules/modalable';
import { css, StyleSheet } from '../aphrodite';
import { themeStyles, mainFontColor } from '../theme';

const styles = StyleSheet.create({
  container: { width: '336px' },
  header: { color: mainFontColor },
  imgBlock: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '26px',
    marginBottom: '21px',
  },
  bntBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  loadBtnWrapper: {
    marginLeft: '16px',
    width: '133px',
  },
  btnWrapper: { width: '149px' },
  saveBtnWrapper: { marginLeft: '9px' },
});

const TagNewForm = ({ save }) => {
  const [tagText, setTagText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <Modal>
      <ModalContext.Consumer>
        {
          ({ closeModal }) => (
            <div className={css(styles.container)}>
              <div className={css(themeStyles.headerFont, styles.header)}>Добавить новую тему</div>
              <div className={css(styles.imgBlock)}>
                <ImageIcon />
                <div className={css(styles.loadBtnWrapper)}>
                  <Button onClick={() => {}}>Загрузить</Button>
                </div>
              </div>
              <Input
                input={{ value: tagText, onChange: e => setTagText(e.target.value) }}
                maxLength={36}
                label="Название темы*"
              />
              <div className={css(styles.bntBlock)}>
                <div className={css(styles.btnWrapper)}>
                  <Button onClick={closeModal} isWaiting={isWaiting}>Отменить</Button>
                </div>
                <div className={css(styles.btnWrapper, styles.saveBtnWrapper)}>
                  <Button
                    onClick={
                      () => {
                        setIsWaiting(true);
                        save(
                          tagText,
                          closeModal,
                          () => {
                            setIsWaiting(false);
                          },
                        );
                      }
                    }
                    btnStyle="info"
                    isWaiting={isWaiting}
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            </div>
          )
        }
      </ModalContext.Consumer>
    </Modal>
  );
};

TagNewForm.propTypes = { save: PropTypes.func };

export default withRouter(TagNewForm);
