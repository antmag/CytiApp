import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform } from 'react-native';
import { Text, View } from '@shoutem/ui';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import {setConnectedUser} from '../../actions';

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

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    var _this = this;
    return (
      <View style={{flex:1}}>
        <Text style={styles.welcome}>Welcome to CYTI App</Text>
        <FBLogin style={styles.buttonFb}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              permissions={["email","user_friends"]}
              loginBehavior={LoginBehavior[Platform.OS]}
              onLogin={function(data){
                console.log("Logged in!");
                console.log(data.type);
                // _this.setState({ connected : data.type });
                // _this.setState({ user : data.credentials });
                _this.props.dispatch(setConnectedUser(data));
                _this.props.navigation.navigate('Homepage');
              }}
              onLogout={function(){
                console.log("Logged out.");
                // _this.setState({ user : null });
              }}
              onLoginFound={function(data){
                console.log("Existing login found.");
                // _this.setState({ connected : data.type });
                // _this.setState({ user : data.credentials });
              }}
              onLoginNotFound={function(){
                console.log("No user logged in.");
                // _this.setState({ user : null });
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
  )}
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

export default connect()(LoginPage);
