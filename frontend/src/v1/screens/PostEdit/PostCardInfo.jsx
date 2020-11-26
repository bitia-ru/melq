import React, { useState } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import CardLayout from '../../layouts/CardLayout';
import Button from '../../components/Button/Button';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import Tag from '../../components/Tag/Tag';

import { css, StyleSheet } from '../../aphrodite';
import { cardColors, defaultColor, mainFontColor, themeStyles, focusBorderColor } from '../../theme';

const styles = StyleSheet.create({
  cardTagWrapper: { width: '368px' },
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

const PostCardInfo = ({
  post,
  removeCardImage,
  loadCardImage,
  onChangePostCardParams,
}) => {
  const [fileInputRef, setFileInputRef] = useState(undefined);

  const preparedTags = () => (
    R.map(
      tag => ({
        id: tag.id,
        component: Tag,
        componentProps: {
          tag,
          size: 'small',
        },
      }),
      post.tags,
    )
  );

  return (
    <CardLayout title="Наполнение карточки поста">
      <div className={css(styles.cardThemeWrapper)}>
        {
          post?.card && post?.tags && (
            <Select
              items={preparedTags()}
              input={
                {
                  value: post?.card?.main_tag_id,
                  onChange: id => onChangePostCardParams('main_tag_id', id),
                }
              }
              placeholder="Выберите темы"
              label="Главная тема поста"
            />
          )
        }
      </div>
      <div className={css(styles.cardView)}>
        <div className={css(styles.cardViewLabel, themeStyles.defaultFont)}>
          Вид карточки
        </div>
        <div className={css(styles.cardViewItems)}>
          <div className={css(styles.cardViewPhotoBtn)}>
            <Button
              onClick={() => onChangePostCardParams('style', 'image')}
              btnStyle={post?.card?.style === 'image' || post?.card?.style === null ? 'info' : null}
            >
              Фотография
            </Button>
          </div>
          <div className={css(styles.cardViewBgBtn)}>
            <Button
              onClick={() => onChangePostCardParams('style', 'fill')}
              btnStyle={post?.card?.style === 'fill' ? 'info' : null}
            >
              Заливка
            </Button>
          </div>
        </div>
        <div>
          {
            post?.card?.style === 'fill'
              ? (
                <div className={css(styles.colorPicker)}>
                  {
                    R.map(
                      color => (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => onChangePostCardParams('fill_color', color)}
                          className={
                            css(
                              styles.colorPickerItem,
                              color === post?.card?.fill_color && styles.colorItemSelected,
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
              : (
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
                      post?.card?.image && (
                        <div className={css(styles.photosContainer)}>
                          <PhotoPreview
                            src={post.card.image.content || post.card.image.url}
                            remove={() => removeCardImage()}
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              )
          }
        </div>
      </div>
      <div className={css(styles.inputWrapper)}>
        <Input
          input={
            {
              value: post?.card?.title,
              onChange: event => onChangePostCardParams('title', event.target.value),
            }
          }
          maxLength={56}
          label="Заголовок карточки"
        />
      </div>
      <div className={css(styles.inputWrapper)}>
        <Input
          input={
            {
              value: post?.card?.description,
              onChange: event => onChangePostCardParams('description', event.target.value),
            }
          }
          maxLength={58}
          label="Краткое описание"
        />
      </div>
    </CardLayout>
  );
};

PostCardInfo.propTypes = {
  post: PropTypes.object,
  removeCardImage: PropTypes.func,
  loadCardImage: PropTypes.func,
  onChangePostCardParams: PropTypes.func,
};

export default PostCardInfo;
