import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationBar, Title, Caption, View, Heading } from '@shoutem/ui';

export default class Topbar extends Component<{}> {
    render() {
      return (
          
        // <View style={{height: 60, backgroundColor:'#abcdef'}} >
        //     <Text>Topbar</Text>
        // </View>  
        <NavigationBar
          styleName="inline"
          centerComponent={
            <View styleName="vertical h-center v-center">
              <Heading>CYTi</Heading>
              <Caption>Capitalize Your Time</Caption>
            </View>
          }
        />  
  
      );
    }
  }