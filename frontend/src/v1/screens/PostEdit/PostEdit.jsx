import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPost, updatePost, createPost, removePost } from '@/v1/redux/posts/actions';
import { loadTags } from '@/v1/redux/tags/actions';
import showToastr from '@/v1/utils/showToastr';
import { currentUser } from '@/v1/redux/user_session/utils';
import PostEditLayout from './PostEditLayout';

class PostEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isWaiting: { submitBtn: false, removeBtn: false },
      images: [],
      removedImagesIds: [],
      imagesUpdatedNames: {},
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    if (slug) {
      this.props.loadPost(slug);
    }
    this.props.loadTags();
  }

  submit = () => {
    const { history } = this.props;
    const { post, isWaiting } = this.state;
    const { slug } = this.props.match.params;

    this.setState({ isWaiting: { ...isWaiting, submitBtn: true } });
    const formData = new FormData();

    if (post.title) {
      formData.append('post[title]', post.title);
    }
    if (post.content) {
      formData.append('post[content]', post.content);
    }
    const diff = (a, b) => {
      if (a.id === undefined) {
        return 1;
      }
      if (b.id === undefined) {
        return -1;
      }
      return a.id - b.id;
    };

    if (post.tags) {
      let existingTags = [];
      R.forEach(
        (tag) => {
          if (tag.id) {
            existingTags = R.append(tag, existingTags);
            formData.append('post[tag_ids][]', tag.id);
            formData.append('post[tags_attributes][][id]', tag.id);
            formData.append('post[tags_attributes][][text]', tag.text);
          }
        },
        // sort is needed for tag_ids go before tags_attributes, without it rails will fail!
        R.sort(diff, post.tags),
      );
      if (slug) {
        R.forEach(
          (removedTag) => {
            formData.append('post[tag_ids][]', removedTag.id);
            formData.append('post[tags_attributes][][id]', removedTag.id);
            formData.append('post[tags_attributes][][text]', removedTag.text);
            formData.append('post[tags_attributes][][_destroy]', true);
          },
          R.difference(this.props.posts[slug].tags, existingTags),
        );
      }
    }
    if (post.card) {
      const { card } = post;
      if (card.title) {
        formData.append('post[card_attributes][title]', card.title);
      }
      if (card.description) {
        formData.append('post[card_attributes][description]', card.description);
      }
      if (card.fill_color) {
        formData.append('post[card_attributes][fill_color]', card.fill_color);
      }
      if (card.style) {
        formData.append('post[card_attributes][style]', card.style);
      }
      if (card.main_tag_id) {
        formData.append('post[card_attributes][main_tag_id]', card.main_tag_id);
      }
      if (card.image?.file) {
        formData.append('post[card_attributes][image]', card.image.file);
      }
      if (card.image === null) {
        formData.append(
          'post[card_attributes][image_attachment_attributes][id]',
          this.props.posts[slug].card.image.id,
        );
        formData.append('post[card_attributes][image_attachment_attributes][_destroy]', true);
      }
    }
    if (post.slug) {
      formData.append('post[slug]', post.slug);
    }
    if (post.seo_title) {
      formData.append('post[seo_title]', post.seo_title);
    }
    if (post.seo_kw) {
      R.forEach(
        (kw) => {
          formData.append('post[seo_kw][]', kw);
        },
        R.split(', ', post.seo_kw),
      );
    }
    if (post.published !== undefined) {
      formData.append('post[published]', post.published);
    }
    if (post.can_comment) {
      formData.append('post[can_comment]', post.can_comment);
    }
    if (post.add_likes_auth_only !== undefined) {
      formData.append('post[add_likes_auth_only]', post.add_likes_auth_only);
    }
    R.forEach(
      (image) => {
        formData.append('post[images][]', image.file, image.name);
      },
      this.state.images,
    );
    R.forEachObjIndexed(
      (filename, id) => {
        formData.append('post[images_attachments_attributes][][id]', id);
        formData.append('post[images_attachments_attributes][][filename]', filename);
      },
      this.state.imagesUpdatedNames,
    );
    R.forEach(
      (id) => {
        formData.append('post[images_attachments_attributes][][id]', id);
        formData.append('post[images_attachments_attributes][][_destroy]', true);
      },
      this.state.removedImagesIds,
    );
    if (slug) {
      this.props.updatePost(
        slug,
        formData,
        () => {
          history.push('/');
        },
        () => {
          this.setState({ isWaiting: { ...isWaiting, submitBtn: false } });
        },
      );
    } else {
      this.props.createPost(
        formData,
        () => {
          history.push('/');
        },
        () => {
          this.setState({ isWaiting: { ...isWaiting, submitBtn: false } });
        },
      );
    }
  };

  remove = () => {
    const { slug } = this.props.match.params;
    const { isWaiting } = this.state;
    this.setState({ isWaiting: { ...isWaiting, removeBtn: true } });
    if (confirm('Удалить пост?')) {
      this.props.removePost(
        slug,
        () => {
          this.props.history.push('/');
        },
        () => {
          this.setState({ isWaiting: { ...isWaiting, removeBtn: false } });
        },
      );
    } else {
      this.setState({ isWaiting: { ...isWaiting, removeBtn: false } });
    }
  };

  onFileRead = () => {
    const { images } = this.state;
    this.setState(
      {
        images: [
          ...R.slice(0, -1, images),
          { ...images[images.length - 1], content: this.fileReader.result },
        ],
      },
    );
  };

  getImageNames = () => {
    const { posts } = this.props;
    const { images, imagesUpdatedNames } = this.state;
    const { slug } = this.props.match.params;

    if (slug) {
      const post = posts[slug];
      return R.concat(
        R.map(image => imagesUpdatedNames[image.id] || image.original_filename, post.images),
        R.map(image => image.name, images),
      );
    }

    return R.map(image => image.name, images);
  };

  prepareFilename = (name) => {
    const cleanedUpName = R.replace(/[^а-яА-Яa-zA-Z0-9-_.]/g, '', name);
    const parts = R.split('.', cleanedUpName);
    const extension = parts.length > 1 ? `.${R.last(parts)}` : '';
    const fileName = parts.length > 1 ? R.join('.', R.slice(0, -1, parts)) : cleanedUpName;
    let indexedName = cleanedUpName;
    const existingNames = this.getImageNames();
    let i = 1;
    while (R.contains(indexedName, existingNames)) {
      indexedName = `${fileName}_${i}${extension}`;
      i += 1;
    }
    return indexedName;
  };

  onFileChosen = (file) => {
    const { images } = this.state;
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.onFileRead;
    this.fileReader.readAsDataURL(file);
    this.setState(
      {
        images: [
          ...images,
          { file, name: this.prepareFilename(file.name) },
        ],
      },
    );
  };

  removeImage = (id) => {
    const { removedImagesIds } = this.state;
    this.setState({ removedImagesIds: [...removedImagesIds, id] });
  };

  removeJustLoadedImage = (index) => {
    const { images } = this.state;
    this.setState({ images: R.remove(index, 1, images) });
  };

  checkNameUniq = (name) => {
    const existingNames = this.getImageNames();
    if (R.reject(n => n !== name, existingNames).length > 1) {
      showToastr('Имена файлов должны быть уникальны', { type: 'error' });
    }
    return false;
  };

  onChangePostParams = (fieldName, fieldValue, callback) => {
    this.setState(
      { post: { ...this.state.post, [fieldName]: fieldValue } },
      callback,
    );
  };

  onChangePostCardParams = (fieldName, fieldValue, callback) => {
    const { post } = this.state;
    this.setState(
      { post: { ...post, card: { ...post.card, [fieldName]: fieldValue } } },
      callback,
    );
  };

  onAnnouncementPhotoLoad = (socialNetwork, data) => {
    console.log(`${socialNetwork} photo loaded`);
  };

  onAnnouncementPhotoRemove = (socialNetwork, index) => {
    console.log(`${socialNetwork} photo removed`);
  };

  onTagsChange = (e) => {
    const { posts } = this.props;
    const { post: postState } = this.state;

    const { slug } = this.props.match.params;
    const post = {
      ...posts[slug],
      ...postState,
    };
    const currentTagId = e?.target?.value !== undefined ? e.target.value : e;
    const currentTag = R.find(R.propEq('id', currentTagId))(this.props.tags);
    if (R.contains(currentTagId, R.map(t => t.id, post.tags || []))) {
      this.onChangePostParams('tags', R.reject(t => t.id === currentTagId, post.tags));
    } else {
      this.onChangePostParams('tags', R.append(currentTag, post.tags || []));
    }
  };

  onCardImageFileRead = (file) => {
    this.onChangePostCardParams(
      'image',
      { file, content: this.fileReader.result },
    );
  };

  onCardImageLoad = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = () => this.onCardImageFileRead(file);
    this.fileReader.readAsDataURL(file);
  };

  onCardImageRemove = () => {
    this.onChangePostCardParams('image', null);
  };

  render() {
    const { posts, user } = this.props;
    const { images, imagesUpdatedNames, post: postState, isWaiting } = this.state;

    const { slug } = this.props.match.params;
    const post = {
      can_comment: 'authorized_only',
      ...posts[slug],
      ...postState,
      card: {
        ...posts[slug]?.card,
        ...(postState?.card ? postState.card : {}),
      },
    };

    return (
      <PostEditLayout
        post={post}
        user={user}
        tags={this.props.tags}
        onTagsChange={this.onTagsChange}
        onChangePostParams={this.onChangePostParams}
        onChangePostCardParams={this.onChangePostCardParams}
        removedImagesIds={this.state.removedImagesIds}
        isWaiting={isWaiting}
        images={images}
        imagesUpdatedNames={imagesUpdatedNames}
        removeImage={this.removeImage}
        checkNameUniq={this.checkNameUniq}
        removeJustLoadedImage={this.removeJustLoadedImage}
        loadImage={this.onFileChosen}
        setImages={newImages => this.setState({ images: newImages })}
        setImagesUpdatedNames={
          (newImagesUpdatedNames) => {
            this.setState({ imagesUpdatedNames: newImagesUpdatedNames });
          }
        }
        onCardImageLoad={this.onCardImageLoad}
        onCardImageRemove={this.onCardImageRemove}
        onAnnouncementPhotoLoad={this.onAnnouncementPhotoLoad}
        onAnnouncementPhotoRemove={this.onAnnouncementPhotoRemove}
        submit={this.submit}
        remove={this.remove}
        slug={slug}
      />
    );
  }
}

PostEdit.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
  tags: PropTypes.array,
  match: PropTypes.object,
  loadPost: PropTypes.func,
  loadTags: PropTypes.func,
  updatePost: PropTypes.func,
  createPost: PropTypes.func,
  removePost: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
  tags: R.values(state.tagsStoreV1.tags),
});

const mapDispatchToProps = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
  loadTags: () => dispatch(loadTags()),
  updatePost: (slug, attributes, afterSuccess, afterAll) => (
    dispatch(updatePost(slug, attributes, afterSuccess, afterAll))
  ),
  createPost: (attributes, afterSuccess, afterAll) => (
    dispatch(createPost(attributes, afterSuccess, afterAll))
  ),
  removePost: (slug, afterSuccess, afterAll) => dispatch(removePost(slug, afterSuccess, afterAll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostEdit));
