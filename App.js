import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { UserProfileContainer } from './app/screens/profile';
import { ProfileContainer } from './app/screens/profile';
import { EditProfileContainer } from './app/screens/editProfile';
import { SearchContainer } from './app/screens/search';
import { UploadContainer } from './app/screens/upload';
import { LocalPicksContainer } from './app/screens/localPicks';
import { RestaurantContainer } from './app/screens/restaurant';
import { CreateNotesContainer } from './app/screens/createNotes'
import UserAuth from './app/screens/auth';
import { SignupContainer } from './app/screens/signup';
import { LoginContainer } from './app/screens/login';
import { f, auth, database} from './config/firebaseconfig';
import { Provider } from 'react-redux';
import store from './app/store';
import * as NavigationService from './app/services/navigation/navigationService';
import axios from 'axios';
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const profile = createStackNavigator({
  Profile: {screen: UserProfileContainer,
    navigationOptions: {
     header: null,
  }},
  RestaurantDisplay: { screen: RestaurantContainer,
    navigationOptions: {
     header: null,
  }},
  ProfileContainer: { screen: ProfileContainer,
    navigationOptions: {
      header: null,
    }
  }
})

const upload= createStackNavigator({
  Upload: {screen: UploadContainer,
    navigationOptions: {
     header: null,
  }},
  CreateNotes: { screen: CreateNotesContainer,
    navigationOptions: {
     header: null,
  }},
})

const search = createStackNavigator({
  Search: {screen: SearchContainer,
    navigationOptions: {
     header: null,
  }},
  LocalPicks: { screen: LocalPicksContainer,
    navigationOptions: {
     header: null,
  }},
  RestaurantDisplay: { screen: RestaurantContainer,
    navigationOptions: {
     header: null,
  }},
  ProfileContainer: { screen: ProfileContainer,
    navigationOptions: {
     header: null,
  }},
})


const TabStack = createMaterialBottomTabNavigator(
  {
    Search: {
      screen: search,
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name='search' type='material' iconStyle={{color: 'white'}} />
        ),
      },
    },
    Upload: {
      screen: upload,
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name='add' type='material' iconStyle={{color: 'white'}} />
        ),
      },
    },
    Profile: {
      screen: profile,
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name='person' type='material' iconStyle={{color: 'white'}} />
        ),
      },
    },
  },
  {
      shifting: true,
      inactiveColor: 'white',
      showIcon: true,
      activeColor: 'skyblue',
      barStyle: {
        backgroundColor: 'rgb(64,64,64)',
        color: 'white'
      }
  }
)

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    UserAuth: {screen: UserAuth},
    Signup: {screen: SignupContainer},
    Login: {screen: LoginContainer},
    EditProfile: {screen: EditProfileContainer}
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
