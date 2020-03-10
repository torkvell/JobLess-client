import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { DashboardScreen } from '../screens/user/';

const Router = createStackNavigator(
  {
    DashboardScreen,
  },
  {
    initialRouteName: 'DashboardScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
