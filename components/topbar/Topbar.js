import React, { Component } from 'react';
import {
    Text,
    View
  } from 'react-native';

export default class Topbar extends Component<{}> {
    render() {
      return (
          
        <View style={{height: 60, backgroundColor:'#abcdef'}} >
            <Text>Topbar</Text>
        </View>    
  
      );
    }
  }