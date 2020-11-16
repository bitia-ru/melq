import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as R from 'ramda';
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from '../layouts/MainScreen/MainScreen';
import { notReady, notExist } from '@/v1/utils';
import { currentUser } from '@/v1/redux/user_session/utils';
import { closeUserSession } from '@/v1/utils/auth';
import { loadPost } from '@/v1/redux/posts/actions';
import { loadComments } from '@/v1/redux/comments/actions';
import Button from '@/v1/components/Button/Button';
import prepareImageUrls from '@/v1/utils/prepareImageUrls';
import PostComments from '../components/PostComments/PostComments';


class PostShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.loadPost(slug);
    this.props.loadComments(slug);
  }

  prepareImageUrls = (content) => {
    if (!content) {
      return '';
    }
    const { posts } = this.props;
    const { slug } = this.props.match.params;
    const post = posts[slug];
    const lookUp = R.fromPairs(
      R.map(image => [image.original_filename, image.url], post.images),
    );
    return prepareImageUrls(lookUp, content);
  };

  render() {
    const { user, history, posts } = this.props;

    const post = posts[this.props.match.params.slug];

    return (
      <MainScreen header="">
        {
          (!notReady(user) && notExist(user))
            ? (
              <Button onClick={() => history.push('#signin')}>Войти</Button>
            )
            : (
              <Button onClick={closeUserSession}>Выйти</Button>
            )
        }
        {
          post && (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <div>{post.updated_at}</div>
              <div
                dangerouslySetInnerHTML={
                  { __html: marked(this.prepareImageUrls(post.content || '')) }
                }
              />
              <div>{`Tags: ${R.join(', ', R.map(tag => tag.text, post.tags))}`}</div>
              <div>{`Likes: ${post.num_of_likes || 0}`}</div>
              <div>{`Reposts: ${post.num_of_reposts || 0}`}</div>
              <div>{`Views: ${post.num_of_views || 0}`}</div>
              <PostComments />
              <div>
                <Link to="/">Back</Link>
                |
                <Link to={`/${post.slug}/edit`}>Edit</Link>
              </div>
            </div>
          )
        }
      </MainScreen>
    );
  }
}

PostShow.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
  loadPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  loadComments: PropTypes.func,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
});

const mapDispatchToProps = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
  loadComments: slug => dispatch(loadComments(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostShow));
