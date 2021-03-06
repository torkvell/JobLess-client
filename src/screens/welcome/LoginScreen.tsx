import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { validate } from '../../core/utils';
import { Navigation } from '../../types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { LOGIN_USER } from '../../core/mutations';

type Props = {
  navigation: Navigation;
  loginThunk: (data: Object) => void;
  dispatch: (type: any, data?: any) => void;
};

const LoginScreen = ({ navigation, dispatch }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const validateInput = () => {
    const emailError = validate.email(email.value);
    const passwordError = validate.password(password.value);
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
      <BackButton goBack={() => navigation.navigate('WelcomeScreen')} />
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
            {error &&
              error.graphQLErrors.map(({ message }) => (
                <Text key={message} style={styles.error}>
                  {message}
                </Text>
              ))}
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
                      dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: response.data,
                      });
                      /*There is no need to navigate the user from here.
                      The navigation container will change to signedIn from redux props*/
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

export default memo(connect(null)(LoginScreen));
