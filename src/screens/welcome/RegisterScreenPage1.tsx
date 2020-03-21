import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const RegisterScreenPage1 = ({ navigation }: Props) => {
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('WelcomeScreen')} />
      <Logo />
      <Header>Choose account type</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('RegisterScreenPage2', { jobless: true })
        }
      >
        I'm jobless
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('RegisterScreenPage2', { jobless: 'false' })
        }
      >
        I'm a job publisher
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: theme.colors.error,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginBottom: 0,
  },
});

export default memo(RegisterScreenPage1);
