import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './app/screens/profile';
import Search from './app/screens/search';
import Upload from './app/screens/upload';
import LocalPicks from './app/screens/localPicks';
import Restaurant from './app/screens/restaurantDescription';
import RestaurantNotes from './app/screens/notes';
import UserAuth from './app/screens/auth';
import Signup from './app/screens/signup';
import Login from './app/screens/login';
import { f, auth, database} from './config/firebaseconfig';
import { Provider } from 'react-redux';
import store from './app/store';
import * as NavigationService from './app/services/navigation/navigationService';
import {loginSuccess} from './app/actions';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    auth.onAuthStateChanged(user => {
      if(user) {
        console.log('App: logged in:', user.uid)
        store.dispatch(loginSuccess(user.uid));
      } else {
        console.log('App: user is logged out!!!')
      }
    })
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

export default App;
