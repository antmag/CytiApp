import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, Dimensions, ToastAndroid } from 'react-native';
import { Image, View, Divider, TextInput, Text, Caption, Icon, Row, TouchableOpacity, Button, Heading, Screen, DropDownMenu } from '@shoutem/ui';
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
      année: [
        { title: 'Année 3', value: 'Année 3' },
        { title: 'Année 4', value: 'Année 4' },
        { title: 'Césure', value: 'Césure' },
        { title: 'Année 5', value: 'Année 5' },
      ],
      filiere : [
        { title: 'Sciences du numérique', value: 'Sciences du numérique' },
        { title: 'Chimie - Procédés', value: 'Chimie - Procédés' },
        { title: 'Informatique et réseaux de Communications', value: 'Informatique et réseaux de Communications' },
      ],
      sexe : [
        { title: 'Homme', value: 'Homme' },
        { title: 'Femme', value: 'Femme' },
      ]
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
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
    FBLoginManager.loginWithPermissions(["email","user_friends","public_profile"], function(error, data){
      if (!error) {
          fetch('http://cyti.club/profil/checkUser/facebookConnexion/',{
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "id_facebook" : JSON.parse(data.profile).id,
                      "username" : JSON.parse(data.profile).first_name,
                      "url": "https://graph.facebook.com/"+JSON.parse(data.profile).id+"/picture?type=large",
                      "annee" : _this.state.selectedAnnee,
                      "filiere" : _this.state.selectedFiliere,
                      "sexe" : _this.state.selectedSexe


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

        <View styleName="vertical h-center v-center" style={{flex:1}}>
          <Heading styleName="bold">Campagne BDE 2018</Heading>
        </View>  

        <View styleName="vertical h-center">
          <Row style={{
              width:'90%',
              elevation : 2
            }}
            styleName="small"
          >
            <Text>Année d'étude: </Text>
            <DropDownMenu
              options={this.state.année}
              selectedOption={this.state.selectedAnnee ? this.state.selectedAnnee : this.state.année[0]}
              onOptionSelected={(annee) => this.setState({ selectedAnnee: annee })}
              titleProperty="title"
              valueProperty="value"
            />
          </Row>

          <Divider />

          <Row style={{
              width:'90%',
              elevation : 2
            }} 
            styleName="small"
          >
            <Text>Filière: </Text>
            <DropDownMenu
              options={this.state.filiere}
              selectedOption={this.state.selectedFiliere ? this.state.selectedFiliere : this.state.filiere[0]}
              onOptionSelected={(filiere) => this.setState({ selectedFiliere: filiere })}
              titleProperty="title"
              valueProperty="value"
            />
          </Row>

          <Divider />

          <Row style={{
              width:'90%',
              elevation : 2
            }} 
            styleName="small"
          >
            <Text>Sexe: </Text>
            <DropDownMenu
              options={this.state.sexe}
              selectedOption={this.state.selectedSexe ? this.state.selectedSexe : this.state.sexe[0]}
              onOptionSelected={(sexe) => this.setState({ selectedSexe: sexe })}
              titleProperty="title"
              valueProperty="value"
            />
          </Row>

          <Divider />

          <Button 
            style = {{
              width:'90%',
              elevation : 2
            }}
            styleName = "secondary" 
            onPress = {this.logInFacebook}
          >
            <Text>LOGIN</Text>
          </Button>

          <Divider />

          {/* <View styleName="horizontal h-center space-between" style={{width:'70%'}}>
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
          </View>   */}

          <Divider />

        </View>
      </Screen>
  )}
}

export default connect()(LoginPage);
