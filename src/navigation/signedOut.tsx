import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  WelcomeScreen,
  LoginScreen,
  RegisterScreenPage1,
  RegisterScreenPage2,
  ForgotPasswordScreen,
} from '../screens/welcome';

const Stack = createStackNavigator();

function SignedOutApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegisterScreenPage1"
          component={RegisterScreenPage1}
        />
        <Stack.Screen
          name="RegisterScreenPage2"
          component={RegisterScreenPage2}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SignedOutApp;
