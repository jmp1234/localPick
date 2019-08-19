import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import * as NavigationService from './app/services/navigation/navigationService';
import { AppContainer } from './routes';
import { StatusBar } from 'react-native';


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
        <StatusBar barStyle="light-content" />
        <AppContainer ref={nav => this.navigator = nav}/>
      </Provider>
    )
  }
}


export default App
