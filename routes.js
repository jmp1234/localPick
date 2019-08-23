import React from 'react';
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
import * as NavigationService from './app/services/navigation/navigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        tabBarIcon: ({tintColor}) =>  (
          <Icon name='search' style={{color: tintColor}} size={25}/>
        ),
      },
    },
    Upload: {
      screen: upload,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>  (
          <Icon name='add' style={{color: tintColor}} size={25}/>
        ),
      },
    },
    Profile: {
      screen: profile,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>  (
          <Icon name='person' style={{color: tintColor}} size={25}/>
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
        backgroundColor: 'rgb(34,34,34)',
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

export const AppContainer = createAppContainer(MainStack)
