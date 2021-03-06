import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const WelcomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Welcome to JobLess</Header>

    <Paragraph>The easiest way for jobless people to find work</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreenPage1')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(WelcomeScreen);
