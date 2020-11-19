import React, { useState } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import CardLayout from '../../layouts/CardLayout';
import Button from '../../components/Button/Button';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import TextArea from '../../components/TextArea/TextArea';

import { css, StyleSheet } from '../../aphrodite';
import { mainFontColor, themeStyles } from '../../theme';

const styles = StyleSheet.create({
  postContentWrapper: { marginTop: '24px' },
  photoBlock: { marginTop: '30px' },
  loadBtnWrapper: {
    display: 'inline-block',
    width: '133px',
    marginLeft: '15px',
  },
  photoLabelText: { color: mainFontColor },
  photoPreviewWrapper: {
    display: 'inline-block',
    marginRight: '10px',
  },
  photosContainer: { marginTop: '12px' },
});

const PostContentInfo = ({
  post,
  onChangePostParams,
  images,
  imagesUpdatedNames,
  removeImage,
  checkNameUniq,
  removeJustLoadedImage,
  setImages,
  setImagesUpdatedNames,
  loadImage,
  removedImagesIds,
}) => {
  const [fileInputRef, setFileInputRef] = useState(undefined);

  const mapIndexed = R.addIndex(R.map);
  const validFileNameRe = new RegExp('^[а-яА-Яa-zA-Z0-9-_.]*$');

  return (
    <CardLayout title="Наполнение поста">
      <Input
        input={
          {
            onChange: event => onChangePostParams('title', event.target.value),
            value: post.title,
          }
        }
        label="Заголовок поста*"
        fontSize="small"
      />
      <div className={css(styles.postContentWrapper)}>
        <TextArea
          input={
            {
              onChange: event => onChangePostParams('content', event.target.value),
              value: post.content,
            }
          }
          label="Текстовый блок*"
          autoResize
        />
      </div>
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
              onChange={event => loadImage(event.target.files[0])}
            />
          </div>
          <div className={css(styles.photosContainer)}>
            {
              R.map(
                image => (
                  <div key={image.id} className={css(styles.photoPreviewWrapper)}>
                    <PhotoPreview
                      src={image.url}
                      remove={() => removeImage(image.id)}
                      onTitleChange={
                        (name) => {
                          if (!R.test(validFileNameRe, name)) {
                            return;
                          }
                          setImagesUpdatedNames({
                            ...imagesUpdatedNames,
                            [image.id]: name,
                          });

                          checkNameUniq(
                            imagesUpdatedNames[image.id] || image.original_filename,
                          );
                        }
                      }
                      title={imagesUpdatedNames[image.id] || image.original_filename}
                    />
                  </div>
                ),
                R.reject(
                  a => R.contains(a.id, removedImagesIds),
                  post.images || [],
                ),
              )
            }
            {
              mapIndexed(
                (image, index) => (
                  <div key={index} className={css(styles.photoPreviewWrapper)}>
                    <PhotoPreview
                      src={image.content}
                      remove={() => removeJustLoadedImage(index)}
                      onTitleChange={
                        (name) => {
                          if (!R.test(validFileNameRe, name)) {
                            return;
                          }
                          setImages(
                            [
                              ...R.slice(0, index, images),
                              { ...image, name },
                              ...R.slice(index + 1, Infinity, images),
                            ],
                          );

                          checkNameUniq(image.name);
                        }
                      }
                      title={image.name}
                    />
                  </div>
                ),
                images,
              )
            }
          </div>
        </div>
      </div>
    </CardLayout>
  );
};

PostContentInfo.propTypes = {
  post: PropTypes.object,
  onChangePostParams: PropTypes.func,
  images: PropTypes.array,
  imagesUpdatedNames: PropTypes.object,
  removeImage: PropTypes.func,
  checkNameUniq: PropTypes.func,
  removeJustLoadedImage: PropTypes.func,
  setImages: PropTypes.func,
  setImagesUpdatedNames: PropTypes.func,
  loadImage: PropTypes.func,
  removedImagesIds: PropTypes.array,
};

export default PostContentInfo;
