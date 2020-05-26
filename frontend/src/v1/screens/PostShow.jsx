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
import Button from '@/v1/components/Button/Button';


class PostShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  componentDidMount() {
    this.props.loadPost(this.props.match.params.slug);
  }

  render() {
    const { user, history, posts } = this.props;

    let post = posts[this.props.match.params.slug];

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
          post && <div key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.updated_at}</div>
            <div dangerouslySetInnerHTML={{ __html: marked(post.content || '') }} />
            <div>{`Tags: ${R.join(', ', R.map(tag => tag.text, post.tags))}`}</div>
            <div>{`Likes: ${post.num_of_likes || 0}`}</div>
            <div>{`Reposts: ${post.num_of_reposts || 0}`}</div>
            <div>{`Views: ${post.num_of_views || 0}`}</div>
            <div>
              <Link to="/">Back</Link>
              |
              <Link to={`/${post.slug}/edit`}>Edit</Link>
            </div>
          </div>
        }
      </MainScreen>
    );
  }
}

PostShow.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
});

const mapDispatchToProps = dispatch => ({ loadPost: slug => dispatch(loadPost(slug)) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostShow));
