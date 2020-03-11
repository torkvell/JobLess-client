import React, { memo } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { connect } from 'react-redux';
import { Text } from 'react-native';

type Props = {
  navigation: Navigation;
};

const JobScreen = ({ navigation }: Props) => (
  <Background>
    <Text>Job Screenss</Text>
  </Background>
);

export default memo(connect(null)(JobScreen));
