/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Main from './components/Main';
import ReponseSondage from './components/sondage/components/reponses/ReponseSondage';
import LoginPage from './components/loginPage/LoginPage';
import ReductionCadeaux from './components/cadeaux/components/ReductionCadeaux';
import PhysiqueCadeaux from './components/cadeaux/components/PhysiqueCadeaux';
import CompletedSurveysList from './components/profil/components/CompletedSurveysList';

import {Provider} from 'react-redux';
import { createStore } from 'redux';
import globalReducer from './reducers';

const store = createStore(globalReducer);


const Navigator = StackNavigator({
  Login: {
    screen: LoginPage,
  },
  Homepage:{
    screen: Main,
  },
  ReponseSondage:{
    screen: ReponseSondage,
  },
  ReductionCadeaux:{
    screen: ReductionCadeaux,
  },
  PhysiqueCadeaux:{
    screen: PhysiqueCadeaux,
  },
  CompletedSurveysList:{
    screen: CompletedSurveysList,
  },
},{
  initialRouteName: 'Login',
  headerMode: 'none',
});

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state ={ connected: "false" };

  }
  
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>  
    );
  }
}


