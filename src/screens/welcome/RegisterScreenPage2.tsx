import React, { memo, useState } from 'react';
import { Mutation } from 'react-apollo';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { Navigation, Route } from '../../types';
import { validate } from '../../core/utils';
import { REGISTER_USER } from '../../core/mutations';

type Props = {
  navigation: Navigation;
  route: Route;
};

const RegisterScreenPage2 = ({ navigation, route }: Props) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState({ value: null, error: '' });
  const [jobless] = useState({
    value: route.params.jobless,
    error: '',
  });

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry({ ...country, value: country.name });
  };

  const validateInput = () => {
    const nameError = validate.name(name.value);
    const emailError = validate.email(email.value);
    const passwordError = validate.password(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }
    return true;
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('RegisterScreenPage1')} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
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
      <CountryPicker
        {...{
          countryCode,
          withFilter: true,
          withFlag: true,
          withCountryNameButton: true,
          withAlphaFilter: false,
          withCallingCode: false,
          withEmoji: true,
          onSelect,
        }}
      />
      <Text style={styles.instructions}>Press above to choose country</Text>
      <Mutation mutation={REGISTER_USER}>
        {(addUser, { data, error }) => (
          <View style={styles.submitContainer}>
            {error && (
              <Text style={styles.error}>
                {error.graphQLErrors ? error.graphQLErrors[0].message : 'Error'}
              </Text>
            )}
            <Button
              mode="contained"
              onPress={() => {
                if (validateInput()) {
                  addUser({
                    variables: {
                      name: name.value,
                      email: email.value,
                      password: password.value,
                      country: country.value,
                      jobless: jobless.value,
                    },
                  }).then(
                    response =>
                      response.data && navigation.navigate('LoginScreen')
                  );
                }
              }}
              style={styles.button}
            >
              Sign Up
            </Button>
          </View>
        )}
      </Mutation>
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
  submitContainer: {
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    height: '7%',
    marginVertical: 12,
    borderColor: 'rgba(0, 0, 0, 0.54)',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
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

export default memo(RegisterScreenPage2);
