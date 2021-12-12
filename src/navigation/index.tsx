import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';
import { RootStackParamList } from '../../types';
import { NAVIGATION_STACKS } from '../utils/constants';
import LinkingConfiguration from './LinkingConfiguration';
import { useSelector } from 'react-redux';
import { getIsUserAuthenticated } from '../store/selectors';
import Home from '../screens/Home';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function PrivateStack() {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION_STACKS.HOME}>
       <Stack.Screen name={NAVIGATION_STACKS.HOME} component={Home}  options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function PublicStack() {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION_STACKS.LOGIN}>
       <Stack.Screen name={NAVIGATION_STACKS.SIGNUP} component={SignupScreen}  options={{ headerShown: false }} />
       <Stack.Screen name={NAVIGATION_STACKS.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const isAuthenticated = useSelector(getIsUserAuthenticated)
  const RenderStack = React.useCallback(() => {
    if (isAuthenticated) {
      return <PrivateStack />
    }
    return <PublicStack />
  }, [isAuthenticated])
  return (<RenderStack/>)
  
}
