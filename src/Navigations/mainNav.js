import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/login';
import SignUP from '../screens/signup';
import Home from '../screens/home';
import Statistics from '../screens/statistics';
import DoorKeeperHome from '../screens/DoorKeeper/home';

function MainNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DoorKeeperHome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="DoorKeeperHome" component={DoorKeeperHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;
