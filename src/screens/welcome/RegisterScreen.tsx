import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native';
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
// import { connect } from 'react-redux';
// import { registerHandler } from '../../store/user/actions.js';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import ModalPicker from 'react-native-modal-picker';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $country: String!
    $jobless: Boolean!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      country: $country
      jobless: $jobless
    ) {
      name
      email
      country
      jobless
    }
  }
`;

const RegisterScreen = ({ navigation, registerHandler }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState({ value: '', error: '' });
  const [jobless, setJobless] = useState({ value: true, error: '' });

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry({ ...country, value: country.name });
  };

  const validateInput = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }
    return true;
  };

  const CustomPicker =
    Platform.OS === 'ios' ? (
      <Text>TODO</Text>
    ) : (
      <Picker
        selectedValue={jobless.value}
        onValueChange={(itemValue, itemIndex) => {
          const newValue = itemValue === 'true' ? true : false;
          setJobless({ value: newValue, error: '' });
        }}
      >
        <Picker.Item label="I am jobless" value="true" />
        <Picker.Item label="I am a job provider" value="false" />
      </Picker>
    );

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
      <View style={styles.pickerContainer}>{CustomPicker}</View>
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
        {(addUser, { data }) => (
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
                }).then(res => navigation.navigate('LoginScreen'));
              }
            }}
            style={styles.button}
          >
            Sign Up
          </Button>
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

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//   };
// };

// export default memo(
//   connect(mapStateToProps, { registerHandler })(RegisterScreen)
// );
export default memo(RegisterScreen);
