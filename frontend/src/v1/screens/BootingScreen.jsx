import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StyleSheet, css } from '../aphrodite';
import { loadUserSession } from '../redux/user_session/actions';

class BootingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserSession();
  }

  render() {
    return (
      <>Загрузка...</>
    );
  }
}

const style = StyleSheet.create({
});

const mapStateToProps = state => ({
  users: state.usersStoreV1.store,
});

const mapDispatchToProps = dispatch => ({
  loadUserSession: () => dispatch(loadUserSession()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BootingScreen));
