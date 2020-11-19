import React, { useState } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import CardLayout from '../../layouts/CardLayout';
import Button from '../../components/Button/Button';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

import { css, StyleSheet } from '../../aphrodite';
import { cardColors, defaultColor, mainFontColor, themeStyles, focusBorderColor } from '../../theme';

const styles = StyleSheet.create({
  cardThemeWrapper: { width: '368px' },
  cardView: { marginTop: '21px' },
  cardViewLabel: { color: defaultColor },
  cardViewItems: {
    display: 'flex',
    marginTop: '13px',
  },
  cardViewPhotoBtn: { width: '127px' },
  cardViewBgBtn: {
    width: '127px',
    marginLeft: '13px',
  },
  inputWrapper: { marginTop: '21px' },
  photoBlock: { marginTop: '30px' },
  loadBtnWrapper: {
    display: 'inline-block',
    width: '133px',
    marginLeft: '15px',
  },
  photoLabelText: { color: mainFontColor },
  photosContainer: { marginTop: '12px' },
  colorPicker: {
    display: 'flex',
    marginTop: '14px',
  },
  colorPickerItem: {
    width: '80px',
    height: '80px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  colorItemSelected: { border: `2px solid ${focusBorderColor}` },
});

const PostCardInfo = ({ post, removeCardImage, loadCardImage }) => {
  const [viewMode, setViewMode] = useState('photo');
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [fileInputRef, setFileInputRef] = useState(undefined);

  return (
    <CardLayout title="Наполнение карточки поста">
      <div className={css(styles.cardThemeWrapper)}>
        <Select
          input={{}}
          items={[]}
          placeholder="Выберите темы"
          label="Главная тема поста"
        />
      </div>
      <div className={css(styles.cardView)}>
        <div className={css(styles.cardViewLabel, themeStyles.defaultFont)}>
          Вид карточки
        </div>
        <div className={css(styles.cardViewItems)}>
          <div className={css(styles.cardViewPhotoBtn)}>
            <Button
              onClick={() => setViewMode('photo')}
              btnStyle={viewMode === 'photo' ? 'info' : null}
            >
              Фотография
            </Button>
          </div>
          <div className={css(styles.cardViewBgBtn)}>
            <Button
              onClick={() => setViewMode('background')}
              btnStyle={viewMode === 'background' ? 'info' : null}
            >
              Заливка
            </Button>
          </div>
        </div>
        <div>
          {
            viewMode === 'photo'
              ? (
                <div className={css(styles.photoBlock)}>
                  <div>
                    <span className={css(styles.photoLabelText, themeStyles.defaultFont)}>
                      Фотографии поста (рекомендуемый размер 11111х2222)
                    </span>
                    <div className={css(styles.loadBtnWrapper)}>
                      <Button onClick={() => fileInputRef.click()}>Загрузить</Button>
                      <input
                        ref={setFileInputRef}
                        type="file"
                        hidden
                        onChange={event => loadCardImage(event.target.files[0])}
                      />
                    </div>
                    {
                      post.card_image && (
                        <div className={css(styles.photosContainer)}>
                          <PhotoPreview
                            src={post.card_image}
                            remove={() => removeCardImage()}
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              )
              : (
                <div className={css(styles.colorPicker)}>
                  {
                    R.map(
                      color => (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedColor(color)}
                          className={
                            css(
                              styles.colorPickerItem,
                              color === selectedColor && styles.colorItemSelected
                            )
                          }
                          style={{ backgroundColor: color }}
                        />
                      ),
                      R.values(cardColors),
                    )
                  }
                </div>
              )
          }
        </div>
      </div>
      <div className={css(styles.inputWrapper)}>
        <Input input={{ value: post.card_title }} maxLength={56} label="Заголовок карточки" />
      </div>
      <div className={css(styles.inputWrapper)}>
        <Input input={{}} maxLength={58} label="Краткое описание" />
      </div>
    </CardLayout>
  );
};

PostCardInfo.propTypes = {
  post: PropTypes.object,
  removeCardImage: PropTypes.func,
  loadCardImage: PropTypes.func,
};

export default PostCardInfo;
