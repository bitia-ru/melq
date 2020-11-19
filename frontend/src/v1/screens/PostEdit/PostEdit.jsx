import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from '../../layouts/MainScreen/MainScreen';
import { loadPost, updatePost, createPost, removePost } from '@/v1/redux/posts/actions';
import { loadTags } from '@/v1/redux/tags/actions';
import FormField from '@/v1/components/FormField/FormField';
import Button from '@/v1/components/Button/Button';
import { StyleSheet, css } from '@/v1/aphrodite';
import prepareImageUrls from '@/v1/utils/prepareImageUrls';
import showToastr from '@/v1/utils/showToastr';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: { flex: 1 },
  textarea: { width: '80%' },
});

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
      R.forEach(
        (tag) => {
          if (!tag.id) {
            formData.append('post[tags_attributes][][text]', tag.text);
          }
        },
        post.tags,
      );
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

  addImage = () => {
    this.inputRef.click();
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

  prepareImageUrls = (content) => {
    if (!content) {
      return '';
    }
    const { posts } = this.props;
    const { images, imagesUpdatedNames } = this.state;
    const { slug } = this.props.match.params;
    let lookUp;
    if (slug) {
      const post = posts[slug];
      lookUp = R.fromPairs(
        R.concat(
          R.map(
            image => [imagesUpdatedNames[image.id] || image.original_filename, image.url],
            R.reject(a => R.contains(a.id, this.state.removedImagesIds), post.images || []),
          ),
          R.map(image => [image.name, image.content], images),
        ),
      );
    } else {
      lookUp = R.fromPairs(R.map(image => [image.name, image.content], images));
    }
    return prepareImageUrls(lookUp, content);
  };

  checkNameUniq = (name) => {
    const existingNames = this.getImageNames();
    if (R.reject(n => n !== name, existingNames).length > 1) {
      showToastr('Имена файлов должны быть уникальны', { type: 'error' });
    }
    return false;
  };

  render() {
    const { posts } = this.props;
    const { images, imagesUpdatedNames, post: postState, isWaiting } = this.state;

    const { slug } = this.props.match.params;
    const post = {
      can_comment: 'authorized_only',
      ...posts[slug],
      ...this.state.post,
    };
    const mapIndexed = R.addIndex(R.map);
    const validFileNameRe = new RegExp('^[а-яА-Яa-zA-Z0-9-_.]*$');
    return (
      <MainScreen header="">
        <h2>{slug ? 'Редактирование поста' : 'Создание поста'}</h2>
        <FormField
          placeholder="Title"
          id="title"
          onChange={
            event => this.setState(
              { post: { ...postState, title: event.target.value } },
            )
          }
          type="text"
          value={post.title}
        />
        <div className={css(styles.container)}>
          <div className={css(styles.column)}>
            <textarea
              className={css(styles.textarea)}
              rows={30}
              value={post.content}
              onChange={
                event => this.setState(
                  { post: { ...postState, content: event.target.value } },
                )
              }
            />
          </div>
          <div
            className={css(styles.column)}
            dangerouslySetInnerHTML={
              { __html: marked(this.prepareImageUrls(post.content || '')) }
            }
          />
        </div>
        <FormField
          placeholder="Tags"
          id="tags"
          onChange={
            (event) => {
              const tags = R.map(
                (t) => {
                  const existingTag = R.find(R.propEq('text', t))(this.props.tags);
                  return { text: t, ...(existingTag && { id: existingTag.id }) };
                },
                R.reject(
                  t => (t === ''),
                  R.split(', ', event.target.value),
                ),
              );
              this.setState({ post: { ...postState, tags } });
            }
          }
          type="text"
          value={R.join(', ', R.map(tag => tag.text, post.tags || []))}
        />
        <FormField
          placeholder="Slug"
          id="slug"
          onChange={
            event => this.setState({ post: { ...postState, slug: event.target.value } })
          }
          type="text"
          value={post.slug}
        />
        <FormField
          placeholder="Seo title"
          id="seo_title"
          onChange={
            event => this.setState(
              { post: { ...postState, seo_title: event.target.value } },
            )
          }
          type="text"
          value={post.seo_title}
        />
        <FormField
          placeholder="Seo key words"
          id="seo_kw"
          onChange={
            event => this.setState(
              { post: { ...postState, seo_kw: event.target.value } },
            )
          }
          type="text"
          value={post.seo_kw}
        />
        <div>
          <input
            type="checkbox"
            disabled={posts[slug]?.published}
            checked={post.published}
            onChange={
              () => this.setState(
                { post: { ...postState, published: !post.published } },
              )
            }
          />
          Published
        </div>
        <div>
          Allow comment:
          <input
            type="radio"
            checked={post.can_comment === 'authorized_only'}
            onChange={
              () => this.setState(
                { post: { ...postState, can_comment: 'authorized_only' } },
              )
            }
          />
          Auth only
          <input
            type="radio"
            checked={post.can_comment === 'everyone'}
            onChange={
              () => this.setState(
                { post: { ...postState, can_comment: 'everyone' } },
              )
            }
          />
          All
          <input
            type="radio"
            checked={post.can_comment === 'nobody'}
            onChange={
              () => this.setState({ post: { ...postState, can_comment: 'nobody' } })
            }
          />
          Not allowed
        </div>
        <div>
          <input
            type="checkbox"
            checked={post.add_likes_auth_only}
            onChange={
              () => {
                this.setState(
                  { post: { ...postState, add_likes_auth_only: !post.add_likes_auth_only } },
                );
              }
            }
          />
          Allow likes for auth only
        </div>
        {
          R.map(
            image => (
              <div key={image.id}>
                <img height="100" src={image.url} alt="" />
                <Button onClick={() => this.removeImage(image.id)}>Remove</Button>
                <FormField
                  placeholder="File Name"
                  onChange={
                    (event) => {
                      if (!R.test(validFileNameRe, event.target.value)) {
                        return;
                      }
                      this.setState(
                        {
                          imagesUpdatedNames: {
                            ...imagesUpdatedNames,
                            [image.id]: event.target.value,
                          },
                        },
                      );
                    }
                  }
                  onBlur={
                    () => {
                      this.checkNameUniq(
                        imagesUpdatedNames[image.id] || image.original_filename,
                      );
                    }
                  }
                  type="text"
                  value={imagesUpdatedNames[image.id] || image.original_filename}
                />
              </div>
            ),
            R.reject(a => R.contains(a.id, this.state.removedImagesIds), post.images || []),
          )
        }
        {
          mapIndexed(
            (image, index) => (
              <div key={index}>
                <img height="100" src={image.content} alt="" />
                <Button onClick={() => this.removeJustLoadedImage(index)}>Remove</Button>
                <FormField
                  placeholder="File Name"
                  onChange={
                    (event) => {
                      if (!R.test(validFileNameRe, event.target.value)) {
                        return;
                      }
                      this.setState(
                        {
                          images: [
                            ...R.slice(0, index, images),
                            { ...image, name: event.target.value },
                            ...R.slice(index + 1, Infinity, images),
                          ],
                        },
                      );
                    }
                  }
                  onBlur={
                    () => {
                      this.checkNameUniq(image.name);
                    }
                  }
                  type="text"
                  value={image.name}
                />
              </div>
            ),
            images,
          )
        }
        <Button onClick={this.addImage}>Add image</Button>
        <div>
          <input
            ref={(ref) => { this.inputRef = ref; }}
            type="file"
            hidden
            onChange={event => this.onFileChosen(event.target.files[0])}
          />
        </div>
        {
          slug && (
            <Button isWaiting={isWaiting.removeBtn} onClick={this.remove}>
              Удалить
            </Button>
          )
        }
        <Button isWaiting={isWaiting.submitBtn} onClick={this.submit}>
          Сохранить
        </Button>
      </MainScreen>
    );
  }
}

PostEdit.propTypes = {
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
