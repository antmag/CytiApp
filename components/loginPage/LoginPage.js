import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform } from 'react-native';
import { View, Divider, TextInput, Row, Title, Button, Text } from '@shoutem/ui';
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

class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    
    var _this = this;
    
    return (
      <View styleName="vertical v-center h-center">
        
        <Title styleName="xl-gutter-bottom xl-gutter-top">Welcome to CYTi App</Title>
        
          <Row styleName="small">
            <TextInput
              placeholder={'Username or email'}
              style={{flex:1}}
            />
          </Row>
          <Divider styleName="line" />
          <Row styleName="small">
            <TextInput
              placeholder={'Password'}
              secureTextEntry
              style={{flex:1}}
            />
          </Row>  

          <Button styleName="secondary sm-gutter-top" style={{width:'100%'}}>
            <Text>LOGIN</Text>
          </Button>

        <View style={{height:60}}>
          <FBLogin style={styles.buttonFb}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                permissions={["email","user_friends"]}
                loginBehavior={LoginBehavior[Platform.OS]}
                onLogin={function(data){
                  console.log("Logged in!");
                  console.log(data.type);
                  _this.props.dispatch(setConnectedUser(data));
                  _this.props.navigation.navigate('Homepage');
                }}
                onLogout={function(){
                  console.log("Logged out.");
                }}
                onLoginFound={function(data){
                  console.log("Existing login found.");
                }}
                onLoginNotFound={function(){
                  console.log("No user logged in.");
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
