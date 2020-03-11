import React, { memo } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { logOut } from '../../store/user/actions';
import { connect } from 'react-redux';

type Props = {
  navigation: Navigation;
  logOut: () => void;
};

const MyProfileScreen = ({ navigation, logOut }: Props) => (
  <Background>
    <Button mode="outlined" onPress={logOut}>
      Logout
    </Button>
  </Background>
);

export default memo(connect(null, { logOut })(MyProfileScreen));
