import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from '../layouts/MainScreen/MainScreen';
import { notReady, notExist } from '@/v1/utils';
import { currentUser } from '@/v1/redux/user_session/utils';
import { closeUserSession } from '@/v1/utils/auth';
import { loadPosts } from '@/v1/redux/posts/actions';
import Button from '@/v1/components/Button/Button';


class MainPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const { user, history, posts } = this.props;

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
        <div>
          <Link to="/new">New</Link>
        </div>
        {
          R.map(
            post => (
              <div key={post.slug}>
                <h2>{post.title}</h2>
                <div>{post.updated_at}</div>
                <div>{`Tags: ${R.join(', ', R.map(tag => tag.text, post.tags))}`}</div>
                <div>{`Likes: ${post.num_of_likes || 0}`}</div>
                <div>{`Reposts: ${post.num_of_reposts || 0}`}</div>
                <div>{`Views: ${post.num_of_views || 0}`}</div>
                <div>
                  <Link to={`/${post.slug}`}>Open</Link>
                  |
                  <Link to={`/${post.slug}/edit`}>Edit</Link>
                </div>
              </div>
            ),
            R.values(posts),
          )
        }
      </MainScreen>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  posts: state.postsStoreV1.posts,
});

const mapDispatchToProps = dispatch => ({ loadPosts: () => dispatch(loadPosts()) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
