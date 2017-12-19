import React, { Component } from 'react';
import { Text, View, Animated, TouchableOpacity } from 'react-native';

import Filter from './components/Filter';
import SondageList from './components/SondageList';


export default class SondagePage extends Component {

  state = {
    fadeFlex: new Animated.Value(1),
  }

  animateFilter(){
    Animated.timing(                  // Animate over time
      this.state.fadeFlex,            // The animated value to drive
      {
        toValue: 6,                   
        duration: 500,              
      }
    ).start();  
  }

  render() {
    
    let { fadeFlex } = this.state;
    
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={{ flex: fadeFlex , backgroundColor:'#123456'}}>
                <TouchableOpacity onPress={this.animateFilter}>
                  <Filter />
                </TouchableOpacity>  
            </Animated.View>
            <View style={{ flex: 6 }}>
              <SondageList />
            </View>  
        </View>
    );
  }
}

