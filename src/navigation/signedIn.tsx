import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {
  JobScreen,
  ChatScreen,
  MyJobScreen,
  ProfileScreen,
} from '../screens/user';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from '../core/theme';
import { connect } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

function SignedInApp(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#f0edf0"
        barStyle={{ backgroundColor: theme.colors.primary }}
      >
        {props.user.jobless === true ? (
          <Tab.Screen
            name="Jobs"
            component={JobScreen}
            options={{
              tabBarLabel: 'Jobs',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="briefcase"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="My Jobs"
            component={MyJobScreen}
            options={{
              tabBarLabel: 'My Jobs',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="briefcase"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="chat-processing"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(SignedInApp);
