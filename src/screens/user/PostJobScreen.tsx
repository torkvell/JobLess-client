import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

export class PostJobScreen extends Component {
  render() {
    return <Text>Post job screen</Text>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen);
