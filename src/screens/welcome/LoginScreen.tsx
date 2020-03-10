import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';
import { Navigation } from '../../types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { loginThunk } from '../../store/user/actions.js';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      country
      jobless
      token
    }
  }
`;

type Props = {
  navigation: Navigation;
  loginThunk: (data: Object) => void;
};

const LoginScreen = ({ navigation, loginThunk }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const validateInput = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Mutation mutation={LOGIN_USER}>
        {(login, { data, error }) => (
          <View style={styles.submitContainer}>
            {error && (
              <Text style={styles.error}>{error.graphQLErrors[0].message}</Text>
            )}
            <Button
              mode="contained"
              onPress={() => {
                if (validateInput()) {
                  login({
                    variables: {
                      email: email.value,
                      password: password.value,
                    },
                  }).then(response => {
                    if (response.data) {
                      loginThunk(response.data);
                      navigation.navigate('Dashboard');
                    }
                  });
                }
              }}
            >
              Login
            </Button>
          </View>
        )}
      </Mutation>
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
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
  submitContainer: {
    width: '100%',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(connect(null, { loginThunk })(LoginScreen));
