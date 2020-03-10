import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { logOut } from '../../store/user/actions.js';
import { connect } from 'react-redux';

type Props = {
  navigation: Navigation;
  logOut: () => void;
};

const DashboardScreen = ({ navigation, logOut }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={logOut}>
      Logout
    </Button>
  </Background>
);

export default memo(connect(null, { logOut })(DashboardScreen));
