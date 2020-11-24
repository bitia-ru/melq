import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';

import Modal from '../layouts/Modal';
import Button from '../components/Button/Button';
import CheckBox from '../components/CheckBox/CheckBox';
import Theme from '../components/Theme/Theme';

import { ModalContext } from '../modules/modalable';
import { css, StyleSheet } from '../aphrodite';
import { themeStyles, mainFontColor, cardColors } from '../theme';

const styles = StyleSheet.create({
  container: { width: '336px' },
  header: { color: mainFontColor },
  btnContainer: {
    display: 'flex',
    marginTop: '24px',
  },
  selectAllBtnWrapper: { width: '147px' },
  unselectAllBtnWrapper: {
    width: '147px',
    marginLeft: '8px',
  },
  themeItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
  },
  themeWrapper: { marginLeft: '16px' },
  saveBtnWrapper: { width: '149px' },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: cardColors[0],
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingRight: '23px',
  },
});

const SetUpThemesForm = ({ save, themes, defaultUnselectedIds }) => {
  const { closeModal } = useContext(ModalContext);
  const [unselectedIds, setUnselectedIds] = useState(defaultUnselectedIds || []);

  useEffect(() => setUnselectedIds(defaultUnselectedIds), [defaultUnselectedIds]);

  const selectAll = () => {
    setUnselectedIds([]);
  };

  const unselectAll = () => {
    setUnselectedIds(R.map(theme => theme.id, themes));
  };

  const onItemClick = (themeId) => {
    if (R.contains(themeId, unselectedIds)) {
      setUnselectedIds(R.reject(id => id === themeId, unselectedIds));
    } else {
      setUnselectedIds([...unselectedIds, themeId]);
    }
  };

  return (
    <Modal
      maxHeight="690px"
      unscrollableFooter={
        <div className={css(styles.footer)}>
          <div className={css(styles.saveBtnWrapper)}>
            <Button
              onClick={
                () => {
                  save(unselectedIds);
                  closeModal();
                }
              }
              btnStyle="info"
            >
              Показать
            </Button>
          </div>
        </div>
      }
    >
      <div className={css(styles.container)}>
        <div className={css(themeStyles.headerFont, styles.header)}>
          Выберите темы для статей
        </div>
        <div className={css(styles.btnContainer)}>
          <div className={css(styles.selectAllBtnWrapper)}>
            <Button onClick={selectAll}>Выбрать все</Button>
          </div>
          <div className={css(styles.unselectAllBtnWrapper)}>
            <Button onClick={unselectAll}>Исключить все</Button>
          </div>
        </div>
        <div>
          {
            R.map(
              theme => (
                <div className={css(styles.themeItemWrapper)}>
                  <CheckBox
                    onClick={() => onItemClick(theme.id)}
                    checked={!R.contains(theme.id, unselectedIds)}
                  />
                  <div className={css(styles.themeWrapper)}>
                    <Theme theme={theme} />
                  </div>
                </div>
              ),
              themes,
            )
          }
        </div>
      </div>
    </Modal>
  );
};

SetUpThemesForm.propTypes = {
  save: PropTypes.func,
  themes: PropTypes.array,
  defaultUnselectedIds: PropTypes.array,
};

export default withRouter(SetUpThemesForm);
