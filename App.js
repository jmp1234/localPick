import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './app/screens/profile';
import Search from './app/screens/search';
import Upload from './app/screens/upload';

const TabStack = createBottomTabNavigator(
  {
    Search: { screen: Search},
    Upload: { screen: Upload},
    Profile: { screen: Profile}
  }
)

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    // User: { screen: UserProfile },
    // Comments: {screen: Comments }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(MainStack)

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
