import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from '../layouts/MainScreen/MainScreen';
import { loadPost, updatePost, createPost, removePost } from '@/v1/redux/posts/actions';
import { loadTags } from '@/v1/redux/tags/actions';
import FormField from '@/v1/components/FormField/FormField';
import Button from '@/v1/components/Button/Button';
import { StyleSheet, css } from '@/v1/aphrodite';


class PostEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isWaiting: { submitBtn: false, removeBtn: false },
      images: [],
      removedImagesIds: [],
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
    let { history } = this.props;
    let { post } = this.state;
    let { slug } = this.props.match.params;

    this.setState({ isWaiting: { ...this.state.isWaiting, submitBtn: true } });
    const formData = new FormData();

    if (post.title) {
      formData.append('post[title]', post.title);
    }
    if (post.content) {
      formData.append('post[content]', post.content);
    }
    const diff = (a, b) => (a.id === undefined ? 1 : (b.id === undefined ? -1 : a.id - b.id));

    if (post.tags) {
      let existingTags = [];
      R.forEach(
        (tag) => {
          if (tag.id) {
            existingTags = R.append(tag, existingTags);
            formData.append('post[tag_ids][]', tag.id);
            formData.append('post[tags_attributes][][id]', tag.id);
          }
          formData.append('post[tags_attributes][][text]', tag.text);
        },
        // sort is needed for tag_ids go before tags_attributes, without it rails will fail!
        R.sort(diff, post.tags),
      );
      if (slug) {
        R.forEach(
          (removedTag) => {
            formData.append('post[tag_ids][]', removedTag.id);
            formData.append('post[tags_attributes][][id]', removedTag.id);
            formData.append('post[tags_attributes][][_destroy]', true);
          },
          R.difference(this.props.posts[slug].tags, existingTags),
        );
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
        formData.append('post[images][]', image.file);
      },
      this.state.images,
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
          this.setState({ isWaiting: { ...this.state.isWaiting, submitBtn: false } });
        },
      );
    } else {
      this.props.createPost(
        formData,
        () => {
          history.push('/');
        },
        () => {
          this.setState({ isWaiting: { ...this.state.isWaiting, submitBtn: false } });
        },
      );
    }
  };

  remove = () => {
    let { slug } = this.props.match.params;
    this.setState({ isWaiting: { ...this.state.isWaiting, removeBtn: true } });
    if (confirm('Удалить пост?')) {
      this.props.removePost(
        slug,
        () => {
          this.props.history.push('/');
        },
        () => {
          this.setState({ isWaiting: { ...this.state.isWaiting, removeBtn: false } });
        }
      )
    } else {
      this.setState({ isWaiting: { ...this.state.isWaiting, removeBtn: false } });
    }
  }

  addImage = () => {
    this.inputRef.click();
  }

  onFileRead = () => {
    const { images } = this.state;
    this.setState(
      {
        images: [
          ...R.slice(0, -1, images),
          { ...images[images.length - 1], content: this.fileReader.result }
        ]
      }
    )
  };

  onFileChosen = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.onFileRead;
    this.fileReader.readAsDataURL(file);
    this.setState(
      {
        images: [
          ...this.state.images,
          { file: file }
        ]
      }
    )
  };

  removeImage = (id) => {
    this.setState({ removedImagesIds: [...this.state.removedImagesIds, id] });
  };

  removeJustLoadedImage = (index) => {
    this.setState({ images: R.remove(index, 1, this.state.images) });
  };

  render() {
    const { posts } = this.props;
    const { images } = this.state;

    let { slug } = this.props.match.params;
    let post = {
      can_comment: 'authorized_only',
      ...posts[slug],
      ...this.state.post
    };
    const mapIndexed = R.addIndex(R.map);
    return (
      <MainScreen header="">
        <h2>{slug ? 'Редактирование поста' : 'Создание поста'}</h2>
        <FormField
          placeholder="Title"
          id="title"
          onChange={event => this.setState({ post: { ...this.state.post, title: event.target.value } })}
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
                event => this.setState({ post: { ...this.state.post, content: event.target.value } })
              }
            />
          </div>
          <div className={css(styles.column)} dangerouslySetInnerHTML={{ __html: marked(post.content || '') }} />
        </div>
        <FormField
          placeholder="Tags"
          id="tags"
          onChange={
            (event) => {
              let tags = R.map(
                t => {
                  let existingTag = R.find(R.propEq('text', t))(this.props.tags);
                  return { text: t, ...(existingTag && { id: existingTag.id }) }
                },
                R.split(', ', event.target.value),
              );
              this.setState({post: {...this.state.post, tags: tags}})
            }
          }
          type="text"
          value={R.join(', ', R.map(tag => tag.text, post.tags || []))}
        />
        <FormField
          placeholder="Slug"
          id="slug"
          onChange={event => this.setState({ post: { ...this.state.post, slug: event.target.value } })}
          type="text"
          value={post.slug}
        />
        <FormField
          placeholder="Seo title"
          id="seo_title"
          onChange={(event) => this.setState({ post: { ...this.state.post, seo_title: event.target.value } })}
          type="text"
          value={post.seo_title}
        />
        <FormField
          placeholder="Seo key words"
          id="seo_kw"
          onChange={(event) => this.setState({ post: { ...this.state.post, seo_kw: event.target.value } })}
          type="text"
          value={post.seo_kw}
        />
        <div>
          <input
            type="checkbox"
            disabled={posts[slug]?.published}
            checked={post.published}
            onChange={(event) => this.setState({ post: { ...this.state.post, published: !post.published } })}
          />Published
        </div>
        <div>
          Allow comment:
          <input
            type="radio"
            checked={post.can_comment === 'authorized_only'}
            onChange={(event) => this.setState({ post: { ...this.state.post, can_comment: 'authorized_only' } })}
          />Auth only
          <input
            type="radio"
            checked={post.can_comment === 'everyone'}
            onChange={(event) => this.setState({ post: { ...this.state.post, can_comment: 'everyone' } })}
          />All
          <input
            type="radio"
            checked={post.can_comment === 'nobody'}
            onChange={(event) => this.setState({ post: { ...this.state.post, can_comment: 'nobody' } })}
          />Not allowed
        </div>
        <div>
          <input
            type="checkbox"
            checked={post.add_likes_auth_only}
            onChange={
              (event) => {
                this.setState({ post: { ...this.state.post, add_likes_auth_only: !post.add_likes_auth_only } })
              }
            }
          />Allow likes for auth only
        </div>
        {
          R.map(
            (image) => (
              <div key={image.id}>
                <img height="100" src={image.url} />
                <Button
                  onClick={() => this.removeImage(image.id)}
                >
                  Remove
                </Button>
                <input readOnly value={image.url}/>
              </div>
            ),
            R.reject(a => R.contains(a.id, this.state.removedImagesIds), post.images || []),
          )
        }
        {
          mapIndexed(
            (image, index) => (
              <div key={index}>
                <img height="100" src={image.content} />
                <Button
                  onClick={() => this.removeJustLoadedImage(index)}
                >
                  Remove
                </Button>
              </div>
            ),
            images,
          )
        }
        <Button onClick={this.addImage}>Add image</Button>
        <div>
          <input
            ref={(ref) => {this.inputRef = ref}}
            type="file"
            hidden
            onChange={event => this.onFileChosen(event.target.files[0])}
          />
        </div>
        {
          slug && (
            <Button
              isWaiting={this.state.isWaiting.removeBtn}
              onClick={this.remove}
            >
              Удалить
            </Button>
          )
        }
        <Button
          isWaiting={this.state.isWaiting.submitBtn}
          onClick={this.submit}
        >
          Сохранить
        </Button>
      </MainScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  textarea: {
    width: '80%',
  }
});

PostEdit.propTypes = {
  posts: PropTypes.object,
  tags: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: state.postsStoreV1.posts,
  tags: state.tagsStoreV1.tags,
});

const mapDispatchToProps = dispatch => ({
  loadPost: (slug) => dispatch(loadPost(slug)),
  loadTags: () => dispatch(loadTags()),
  updatePost: (slug, params, afterSuccess, afterAll) => dispatch(updatePost(slug, params, afterSuccess, afterAll)),
  createPost: (params, afterSuccess, afterAll) => dispatch(createPost(params, afterSuccess, afterAll)),
  removePost: (slug, afterSuccess, afterAll) => dispatch(removePost(slug, afterSuccess, afterAll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostEdit));
