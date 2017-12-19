import React, { Component } from 'react';
import {
    Text,
    View
  } from 'react-native';

export default class Topbar extends Component<{}> {
    render() {
      return (
          
        <View
            style={{
                flexDirection: 'row',
                height: 100,
                padding: 20,
            }}
        >
            <Text>Topbar</Text>
        </View>    
  
      );
    }
  }