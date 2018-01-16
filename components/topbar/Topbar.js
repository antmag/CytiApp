import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';

import {setConnectedUser} from '../../actions';

class Topbar extends Component {
    render() {
      return (
          
        <NavigationBar
          styleName="inline"
          leftComponent={
            <View styleName="vertical v-center">
              <Heading>CYTi</Heading>
              <Caption>Capitalize Your Time</Caption>
            </View>
          }
          rightComponent={
            <View styleName="horizontal v-center">
              <Image
                styleName="small-avatar"
                //source={{ uri: this.props.userData.profile.picture.data.url}}
              />
              <Text>{this.props.userData.profile.first_name}</Text>
              <Button styleName="clear"
                      onPress={() => {
                        const navigateBack = NavigationActions.back();
                        this.props.navigation.dispatch(navigateBack); 
                      }}
              >
                <Icon name="exit-to-app" />
              </Button>  
            </View>
          }
        /> 
  
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
    }
  }

  export default connect(mapStateToProps)(Topbar);