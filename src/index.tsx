import React from 'react';
import { connect } from 'react-redux';
import SignedIn from './navigation/signedIn';
import SignedOut from './navigation/signedOut';

function index(props) {
  if (props.user.token) {
    return <SignedIn />;
  } else {
    return <SignedOut />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(index);
