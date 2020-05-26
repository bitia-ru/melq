import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import BootingScreen from './screens/BootingScreen';
import MainPage from './screens/MainPage';
import PostShow from './screens/PostShow';
import PostEdit from './screens/PostEdit';
import { currentUser as currentUserObtainer } from './redux/user_session/utils';

const V1 = ({ currentUser }) => (
  <>
    {
      currentUser !== undefined ? (
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path={['/new', '/:slug/edit']} component={PostEdit} />
          <Route exact path="/:slug" component={PostShow} />
        </Switch>
      ) : (
        <BootingScreen />
      )
    }
  </>
);

const mapStateToProps = state => ({
  currentUser: currentUserObtainer(state),
});

export default connect(mapStateToProps)(V1);
