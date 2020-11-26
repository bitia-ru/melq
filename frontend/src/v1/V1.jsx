import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import BootingScreen from './screens/BootingScreen';
import MainPage from './screens/MainPage';
import PostShow from './screens/PostShow';
import PostEdit from './screens/PostEdit/PostEdit';
import { currentUser as currentUserObtainer } from './redux/user_session/utils';
import { default as MainExamplePage } from './examples/Main';
import examples from '@/v1/examples';
import TagsIndex from './screens/TagsIndex';
import SettingsEdit from './screens/SettingsEdit/SettingsEdit';

const V1 = ({ currentUser }) => (
  <>
    {
      currentUser !== undefined ? (
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/components" component={MainExamplePage} />
          <Route exact path="/tags" component={TagsIndex} />
          <Route exact path="/settings" component={SettingsEdit} />
          <Route exact path={['/new', '/:slug/edit']} component={PostEdit} />
          <Route exact path="/:slug" component={PostShow} />
          <Route
            exact
            path="/components/:component"
            render={props => React.createElement(examples[props.match.params.component])}
          />
        </Switch>
      ) : (
        <BootingScreen />
      )
    }
  </>
);

V1.propTypes = {
  currentUser: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = state => ({ currentUser: currentUserObtainer(state) });

export default connect(mapStateToProps)(V1);
