import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {ProfileContainer} from './app/screens/profile';
import Search from './app/screens/search';
import Upload from './app/screens/upload';
import LocalPicks from './app/screens/localPicks';
import RestaurantDisplay from './app/screens/restaurantDisplay';
import CreateNotes from './app/screens/createNotes'
import UserAuth from './app/screens/auth';
import {SignupContainer} from './app/screens/signup';
import {LoginContainer} from './app/screens/login';
import { f, auth, database} from './config/firebaseconfig';
import { Provider } from 'react-redux';
import store from './app/store';
import * as NavigationService from './app/services/navigation/navigationService';
import axios from 'axios';

const profile = createStackNavigator({
  Profile: {screen: ProfileContainer,
    navigationOptions: {
     header: null,
  }},
  RestaurantDisplay: { screen: RestaurantDisplay,
    navigationOptions: {
     header: null,
  }},
})

const upload= createStackNavigator({
  Upload: {screen: Upload,
    navigationOptions: {
     header: null,
  }},
  CreateNotes: { screen: CreateNotes,
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
    Upload: { screen: upload},
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
    Signup: {screen: SignupContainer},
    Login: {screen: LoginContainer},
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(MainStack)

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer ref={nav => this.navigator = nav}/>
      </Provider>
    )
  }
}


export default App
