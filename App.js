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

import {Provider} from 'react-redux';
import { createStore } from 'redux';
import globalReducer from './reducers';
import {setConnectedUser } from './actions';

const store = createStore(globalReducer);

var LoginBehavior = {
  'ios': FBLoginManager.LoginBehaviors.Browser,
  'android': FBLoginManager.LoginBehaviors.Native
}

FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
  if (!error) {
    console.log("Login data: ", data);
  } else {
    console.log("Error: ", error);
  }
})



export default class App extends Component<{}> {

constructor(props) {
     super(props);
     this.state ={ isLoggedIn: false };

}
  
  render() {
    var _this = this;
    if(_this.state.connected == "success"){
      return (
      <Provider store={store} >
        <View style={{flex:1}}>
          <BottomBar />
        </View>
      </Provider>
    );
    }else{
      return (
        <Provider store={store} >
          <View style={{flex:1}}>
            <Text style={styles.welcome}>Welcome to CYTI App</Text>
              <FBLogin style={styles.buttonFb}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                permissions={["email","user_friends"]}
                loginBehavior={LoginBehavior[Platform.OS]}
                onLogin={function(data){
                  console.log("Logged in!");
                  console.log(data.type);
                  store.dispatch(setConnectedUser(data));
                  _this.setState({ connected : data.type });
                  _this.setState({ user : data.credentials });
                }}
                onLogout={function(){
                  console.log("Logged out.");
                  _this.setState({ user : null });
                }}
                onLoginFound={function(data){
                  console.log("Existing login found.");
                  store.dispatch(setConnectedUser(data));
                  _this.setState({ connected : data.type });
                  _this.setState({ user : data.credentials });
                }}
                onLoginNotFound={function(){
                  console.log("No user logged in.");
                  _this.setState({ user : null });
                }}
                onError={function(data){
                  console.log("ERROR");
                }}
                onCancel={function(){
                  console.log("User cancelled.");
                }}
                onPermissionsMissing={function(data){
                  console.log("Check permissions!");
                  console.log(data);
                }}
              />
          </View>
        </Provider>
      );
    }
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
    textAlign: 'center',
    margin: 10,
  },
  buttonFb: {
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
