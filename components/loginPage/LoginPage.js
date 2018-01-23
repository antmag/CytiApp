import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, Dimensions, ToastAndroid } from 'react-native';
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
      password : '',
      status : 'wrongUsername',
    }

    // //Log out the user when he arrive on the login page
    // FBLoginManager.logout(function(error, data){
    //   if (error) {
    //     console.log(error, data);
    //   }
    // });

    this.logInFacebook = this.logInFacebook.bind(this);
    this.logIn = this.logIn.bind(this);

  }

  logIn(){

    //TODO: Erase following lines when the server is ready
    if(true){
      ToastAndroid.showWithGravity(
        'Please connect with Facebook for now',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if(this.state.username === '' || this.state.password === ''){
      ToastAndroid.showWithGravity(
        'Please fill your username and your password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    
    const bodyJson = JSON.stringify({
      username : this.state.username,
      password : this.state.password
    });
    //Send the request to the server
    fetch('https://facebook.github.io/react-native/movies.json',{
      method: 'POST',
      body: bodyJson
    })
    .then((response) => response.json())
    .then((responseJson) => {
      switch(responseJson.status){
        case 'wrongUsername':
          this.setState({
            username: '',
            password: ''
          });
          ToastAndroid.showWithGravity(
            "This username doesn't exist",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          break;
        case 'wrongPassword':
          this.setState({
            username: '',
            password: ''
          });
          ToastAndroid.showWithGravity(
            'Wrong password',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          break;
        case 'connection':
          this.props.dispatch(setConnectedUser(reponse));
          this.props.navigation.navigate('Homepage');
          break;
        default:
          this.setState({
            username: '',
            password: ''
          });
          break;
      }
    })
    
    .catch((error) => {
      this.setState({
        username: '',
        password: ''
      });
      ToastAndroid.showWithGravity(
        'Something went wrong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.error(error);
    });

  }

  logInFacebook(){
    let _this = this;
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
    FBLoginManager.loginWithPermissions(["email","user_friends","public_profile"], function(error, data){
      if (!error) {
        console.log(data);

          fetch('http://195.154.107.158:1337/profil/checkUser/facebookConnexion/',{
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "id_facebook" : JSON.parse(data.profile).id,
                      "username" : JSON.parse(data.profile).first_name,
                      "url": "https://graph.facebook.com/"+JSON.parse(data.profile).id+"/picture?type=large"

                    })
                  })
          .then((response) => response.json())
          .then((responseJson) => {
            
             _this.props.dispatch(setConnectedUser(responseJson));
             _this.props.navigation.navigate('Homepage');

          })
          .catch((error) => {
            console.error(error);
          });
        

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
            opacity: 0.5,
            height: height*1.1,
          }}
          source={require('../../assets/images/loginBackground.jpg')}
        /> 

        <View  styleName="vertical h-center v-center" style={{flex:1}}>
          <Image
            styleName="medium-wide"
            style={{width:'90%',height:147}}
            source={require('../../assets/images/logo-transparent.png')}
          />  
        </View>  

        {/* <View styleName="vertical h-center v-center" style={{flex:1}}>
          <Heading styleName="bold">CYTi</Heading>
          <Caption>Capitalise Your Time</Caption>
        </View> */}
        <View styleName="vertical h-center">
          <Row style={{
              width:'90%',
              elevation : 2
            }}
            styleName="small"
          >
            <Icon name="friends" />
            <TextInput
              style={{flex:1}}
              placeholder={'Username or email'}
              onChangeText={(text) => this.setState({username:text})}
              value={this.state.username}
            />
          </Row>

          <Divider />

          <Row style={{
              width:'90%',
              elevation : 2
            }} 
            styleName="small"
          >
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

          <Button 
            style = {{
              width:'90%',
              elevation : 2
            }}
            styleName = "secondary" 
            onPress = { this.logIn }
          >
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

        </View>
      </Screen>
  )}
}

export default connect()(LoginPage);
