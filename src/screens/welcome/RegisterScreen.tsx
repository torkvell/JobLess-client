import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
// import { Navigation, RegisterHandler } from '../../types';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import { connect } from 'react-redux';
import { registerHandler } from '../../store/user/actions.js';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

// type Props = {
//   navigation: Navigation;
//   registerHandler: RegisterHandler;
// };

const RegisterScreen = ({ navigation, registerHandler }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [jobless, setJobless] = useState({ value: 'true', error: '' });

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    registerHandler(
      name.value,
      email.value,
      password.value,
      country.name,
      jobless.value
    );
    // navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={jobless.value}
          onValueChange={(itemValue, itemIndex) =>
            setJobless({ value: itemValue, error: '' })
          }
        >
          <Picker.Item label="I am jobless" value="true" />
          <Picker.Item label="I am a job provider" value="false" />
        </Picker>
      </View>

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
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default memo(
  connect(mapStateToProps, { registerHandler })(RegisterScreen)
);
// export default memo(RegisterScreen);
