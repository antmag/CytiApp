/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import BottomBar from './components/bottomBar/BottomBar';

import FBLoginView from './components/loginPage/LoginPage';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

var LoginBehavior = {
  'ios': FBLoginManager.LoginBehaviors.Browser,
  'android': FBLoginManager.LoginBehaviors.Native
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to CYTi!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Learn how to Capitalize Your Time ;)
      //   </Text>
      //   <Text style={styles.instructions}>
      //     {instructions}
      //   </Text>
      // </View>
      //<View style={{flex:1}}>
        //<BottomBar />
      //</View>

      <View style={{flex:1}}>
        <Text style={styles.welcome}>Welcome to CYTI App</Text>
        <FBLogin
            buttonView={<FBLoginView/>}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            loginBehavior={LoginBehavior[Platform.OS]}
            permissions={["email","user_friends"]}
            onLogin={function(e){console.log(e)}}
            onLoginFound={function(e){console.log(e)}}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
