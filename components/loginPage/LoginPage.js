import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Image, View, Divider, TextInput, Text, Caption, Icon, Row, TouchableOpacity, Button, Heading, Screen } from '@shoutem/ui';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import {setConnectedUser} from '../../actions';

var LoginBehavior = {
  'ios': FBLoginManager.LoginBehaviors.Browser,
  'android': FBLoginManager.LoginBehaviors.Native
}
const { width, height } = Dimensions.get('window');

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username : '',
      password : ''
    }

    // //Log out the user when he arrive on the login page
    // FBLoginManager.logout(function(error, data){
    //   if (error) {
    //     console.log(error, data);
    //   }
    // });

    this.logInFacebook = this.logInFacebook.bind(this);

  }

  logInFacebook(){
    let _this = this;
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        _this.props.dispatch(setConnectedUser(data));
        _this.props.navigation.navigate('Homepage');
      } else {
        console.log("Error: ", error);
      }
    })
  }

  render(){

    const resizeMode = 'contain';
    
    return (
      <Screen styleName="full-screen">

        <Image
          styleName="large"
          style={{
            position:'absolute',
            zIndex:-1,
            opacity: 0.5,
            height: height*1.1,
          }}
          source={require('../../assets/images/loginBackground.jpg')}
        /> 

        <View styleName="vertical h-center v-center" style={{flex:1}}>
          <Heading styleName="bold">CYTi</Heading>
          <Caption>Capitalise Your Time</Caption>
        </View>
        <View styleName="vertical h-center">
          <Row style={{width:'90%'}} styleName="small">
            <Icon name="friends" />
            <TextInput
              style={{flex:1}}
              placeholder={'Username or email'}
              onChangeText={(text) => this.setState({username:text})}
              value={this.state.username}
            />
          </Row>

          <Divider />

          <Row style={{width:'90%'}} styleName="small">
            <Icon name="lock" />
            <TextInput
              style={{flex:1}}
              placeholder={'Password'}
              secureTextEntry
              onChangeText={(text) => this.setState({password:text})}
              value={this.state.password}
            />
          </Row>

          <Divider />

          <Button styleName="secondary" style={{width:'90%'}}>
            <Text>LOGIN</Text>
          </Button>

          <Divider />

          <View styleName="horizontal h-center space-between" style={{width:'70%'}}>
            <TouchableOpacity
              onPress = {this.logInFacebook}
            >
              <Icon name="facebook" />
            </TouchableOpacity>
            <TouchableOpacity>  
              <Icon name="tweet" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="instagram" />
            </TouchableOpacity>  
          </View>  

          <Divider />

          {/* <View style={{height:60}}>
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
              </View> */}
            </View>
        </Screen>
  )}
}

export default connect()(LoginPage);
