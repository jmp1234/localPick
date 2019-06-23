import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './app/screens/profile';
import Search from './app/screens/search';
import Upload from './app/screens/upload';
import LocalPicks from './app/screens/localPicks';
import Restaurant from './app/screens/restaurantDescription';
import RestaurantNotes from './app/screens/notes';
import UserAuth from './app/components/auth';
import Signup from './app/components/signup';
import Login from './app/components/login';


const profile = createStackNavigator({
  Profile: {screen: Profile,
    navigationOptions: {
     header: null,
  }},
  RestaurantNotes: { screen: RestaurantNotes,
    navigationOptions: {
     header: null,
  }},
})

const search = createStackNavigator({
  Search: {screen: Search,
    navigationOptions: {
     header: null,
  }},
  LocalPicks: { screen: LocalPicks,
    navigationOptions: {
     header: null,
  }},
})

const TabStack = createBottomTabNavigator(
  {
    Search: { screen: search},
    Upload: { screen: Upload},
    Profile: { screen: profile},
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'white',
      activeTintColor: 'skyblue',
      style: {
        backgroundColor: 'rgb(64,64,64)',
        color: 'white'
      }
    }
  }
)

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    UserAuth: {screen: UserAuth},
    Signup: {screen: Signup},
    Login: {screen: Login},
    Restaurant: {screen: Restaurant},
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
