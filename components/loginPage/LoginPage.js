import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import {setConnectedUser } from '../../actions';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

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
//var Icon = require('react-native-vector-icons/FontAwesome');

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class FBLoginView extends Component {

  constructor(props) {
      super(props);
    }

    render(){
        var _this = this;
        return (
           <FBLogin style={styles.buttonFb}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                permissions={["email","user_friends"]}
                loginBehavior={LoginBehavior[Platform.OS]}
                onLogin={function(data){
                  console.log("Logged in!");
                  console.log(data.type);
                  _this.setState({ connected : data.type });
                  _this.setState({ user : data.credentials });
                }}
                onLogout={function(){
                  console.log("Logged out.");
                  _this.setState({ user : null });
                }}
                onLoginFound={function(data){
                  console.log("Existing login found.");
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
      )
    }
}

const styles = StyleSheet.create({
  buttonFb: {
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FBLoginView;