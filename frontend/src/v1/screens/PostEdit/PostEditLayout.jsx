import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '@/v1/aphrodite';

import TwoColumnsLayout from '../../layouts/TwoColumnsLayout';
import CardLayout from '../../layouts/CardLayout';
import Select from '../../components/Select/Select';
import PostContentInfo from './PostContentInfo';
import PostCardInfo from './PostCardInfo';
import PostLinkInfo from './PostLinkInfo';
import AutopostInfo from './AutopostInfo';
import SeoInfo from './SeoInfo';
import Link from '../../components/Link/Link';
import Button from '../../components/Button/Button';
import MainScreen from '../../layouts/MainScreen/MainScreen';
import Theme from '../../components/Theme/Theme';
import PostContent from '../../components/PostContent/PostContent';

const styles = StyleSheet.create({
  container: { marginTop: '40px' },
  rightBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  twoColumnRow: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  leftColumn: { marginRight: '12px' },
  rightColumn: { marginLeft: '12px' },
  deletePreviewBtnWrapper: {
    textAlign: 'center',
    marginTop: '24px',
    marginBottom: '24px',
  },
  deletePreviewBtnLinkText: {
    marginLeft: '7px',
    marginTop: '1px',
  },
  deletePreviewBtnInnerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  publishBtnWrapper: { marginTop: '16px' },
  cardWrapper: { marginTop: '24px' },
  btnText: { marginLeft: 7 },
});

const PostEditLayout = ({
  post,
  postOrigin,
  user,
  tags,
  onTagsChange,
  onChangePostParams,
  removedImagesIds,
  isWaiting,
  images,
  imagesUpdatedNames,
  removeImage,
  checkNameUniq,
  removeJustLoadedImage,
  loadImage,
  setImages,
  setImagesUpdatedNames,
  onCardImageLoad,
  onCardImageRemove,
  onChangePostCardParams,
  onAnnouncementPhotoRemove,
  onAnnouncementPhotoLoad,
  submit,
  slug,
  remove,
  previewMode,
  openPreview,
  closePreview,
}) => {
  const preparedTags = () => (
    R.map(
      tag => ({
        id: tag.id,
        component: Theme,
        componentProps: {
          theme: tag,
          size: 'small',
        },
      }),
      tags,
    )
  );

  return (
    <MainScreen header="" user={user}>
      <div className={css(styles.container)}>
        <TwoColumnsLayout>
          <div className={css(styles.leftBlock)}>
            {
              previewMode
                ? (
                  <PostContent
                    slug={slug}
                    removedImagesIds={removedImagesIds}
                    postOrigin={postOrigin}
                    post={post}
                    images={images}
                    imagesUpdatedNames={imagesUpdatedNames}
                  />
                )
                : (
                  <>
                    <div className={css(styles.twoColumnRow)}>
                      <div className={css(styles.leftColumn)}>
                        <CardLayout title="Темы поста">
                          {
                            tags && (
                              <Select
                                items={preparedTags()}
                                input={
                                  {
                                    value: R.map(t => t.id, post.tags || []),
                                    onChange: onTagsChange,
                                  }
                                }
                                multiple
                              />
                            )
                          }
                        </CardLayout>
                      </div>
                      <div className={css(styles.rightColumn)}>
                        <CardLayout title="Кто может комментировать">
                          <Select
                            items={
                              [
                                { id: 'everyone', text: 'Все' },
                                { id: 'authorized_only', text: 'Только авторизованные пользователи' },
                                { id: 'nobody', text: 'Никто' },
                              ]
                            }
                            input={
                              {
                                value: post.can_comment,
                                onChange: value => onChangePostParams('can_comment', value),
                              }
                            }
                          />
                        </CardLayout>
                      </div>
                    </div>
                    <div className={css(styles.cardWrapper)}>
                      <PostContentInfo
                        post={post}
                        removedImagesIds={removedImagesIds}
                        onChangePostParams={onChangePostParams}
                        images={images}
                        imagesUpdatedNames={imagesUpdatedNames}
                        removeImage={removeImage}
                        checkNameUniq={checkNameUniq}
                        removeJustLoadedImage={removeJustLoadedImage}
                        loadImage={loadImage}
                        setImages={setImages}
                        setImagesUpdatedNames={setImagesUpdatedNames}
                      />
                    </div>
                    <div className={css(styles.cardWrapper)}>
                      <PostCardInfo
                        post={post}
                        loadCardImage={onCardImageLoad}
                        removeCardImage={onCardImageRemove}
                        onChangePostCardParams={onChangePostCardParams}
                      />
                    </div>
                    <div className={css(styles.cardWrapper)}>
                      <PostLinkInfo link="some link" />
                    </div>
                    <div className={css(styles.cardWrapper)}>
                      <AutopostInfo
                        post={post}
                        onChange={onChangePostParams}
                        onRemovePhoto={onAnnouncementPhotoRemove}
                        onLoadPhoto={onAnnouncementPhotoLoad}
                      />
                    </div>
                    <div className={css(styles.cardWrapper)}>
                      <SeoInfo onChange={onChangePostParams} post={post} />
                    </div>
                  </>
                )
            }
          </div>
          <div className={css(styles.rightBlock)}>
            <div className={css(styles.btnContainer)}>
              {
                previewMode
                  ? (
                    <Button onClick={closePreview} btnStyle="info">
                      <div>
                        <svg width={16} height={15}>
                          <use
                            xlinkHref={
                              `${require('../../components/Button/images/back.svg')}#back`
                            }
                          />
                        </svg>
                        <span className={css(styles.btnText)}>Вернуться назад</span>
                      </div>
                    </Button>
                  )
                  : (
                    <>
                      <Button onClick={submit} isWaiting={isWaiting.submitBtn}>
                        Сохранить в черновик
                      </Button>
                      <div className={css(styles.publishBtnWrapper)}>
                        <Button
                          isWaiting={isWaiting.submitBtn}
                          onClick={() => onChangePostParams('published', true, submit)}
                          btnStyle="info"
                        >
                          Опубликовать
                        </Button>
                      </div>
                      <div className={css(styles.deletePreviewBtnWrapper)}>
                        <Link onTriggered={openPreview}>
                          <div className={css(styles.deletePreviewBtnInnerContainer)}>
                            <svg width={16} height={16}>
                              <use
                                xlinkHref={
                                  `${require('../../components/Link/images/preview.svg')}#preview`
                                }
                              />
                            </svg>
                            <span className={css(styles.deletePreviewBtnLinkText)}>
                              Предпросмотр
                            </span>
                          </div>
                        </Link>
                      </div>
                      {
                        slug && (
                          <div className={css(styles.deletePreviewBtnWrapper)}>
                            <Link onTriggered={remove} isWaiting={isWaiting.removeBtn}>
                              <div className={css(styles.deletePreviewBtnInnerContainer)}>
                                <svg width={16} height={16}>
                                  <use
                                    xlinkHref={
                                      `${require('../../components/Link/images/trash.svg')}#trash`
                                    }
                                  />
                                </svg>
                                <span className={css(styles.deletePreviewBtnLinkText)}>
                                  Удалить
                                </span>
                              </div>
                            </Link>
                          </div>
                        )
                      }
                    </>
                  )
              }
            </div>
          </div>
        </TwoColumnsLayout>
      </div>
    </MainScreen>
  );
};

PostEditLayout.propTypes = {
  post: PropTypes.object,
  postOrigin: PropTypes.object,
  user: PropTypes.object,
  tags: PropTypes.array,
  onTagsChange: PropTypes.func,
  onChangePostParams: PropTypes.func,
  removedImagesIds: PropTypes.array,
  isWaiting: PropTypes.object,
  images: PropTypes.array,
  imagesUpdatedNames: PropTypes.array,
  removeImage: PropTypes.func,
  checkNameUniq: PropTypes.func,
  removeJustLoadedImage: PropTypes.func,
  loadImage: PropTypes.func,
  setImages: PropTypes.func,
  setImagesUpdatedNames: PropTypes.func,
  onCardImageLoad: PropTypes.func,
  onCardImageRemove: PropTypes.func,
  onChangePostCardParams: PropTypes.func,
  onAnnouncementPhotoRemove: PropTypes.func,
  onAnnouncementPhotoLoad: PropTypes.func,
  submit: PropTypes.func,
  slug: PropTypes.string,
  remove: PropTypes.func,
  previewMode: PropTypes.bool,
  openPreview: PropTypes.func,
  closePreview: PropTypes.func,
};

export default PostEditLayout;
