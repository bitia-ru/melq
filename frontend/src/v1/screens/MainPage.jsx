import React from 'react';
import { withRouter } from 'react-router-dom';
import MainScreen from '../layouts/MainScreen/MainScreen';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { notReady, notExist } from '@/v1/utils';
import { currentUser } from '@/v1/redux/user_session/utils';
import { closeUserSession } from '@/v1/utils/auth';
import Button from '@/v1/components/Button/Button';

class MainPage extends React.PureComponent {
  render() {
    const {
      user, history,
    } = this.props;

    return (
      <MainScreen
        header=""
      >
        {
          (!notReady(user) && notExist(user))
            ? (
              <Button onClick={() => history.push('#signin')}>
                Войти
              </Button>
            )
            : (
              <Button onClick={closeUserSession}>
                Выйти
              </Button>
            )
        }
      </MainScreen>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: currentUser(state),
});

export default connect(mapStateToProps)(withRouter(MainPage));
