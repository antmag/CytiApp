import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';

import {setConnectedUser} from '../../actions';

class Topbar extends Component {
    render() {
      return (
          
        // <View style={{height: 60, backgroundColor:'#abcdef'}} >
        //     <Text>Topbar</Text>
        // </View>  
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
                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
              />
              <Text>{this.props.userName}</Text>
              <Button styleName="clear"
                      onPress={() => this.props.dispatch(setConnectedUser(null)) }
              >
                <Icon name="exit-to-app" />
              </Button>  
            </View>
          }
        /> 
  
      );
    }
  }

  export default connect()(Topbar);