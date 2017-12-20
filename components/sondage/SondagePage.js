import React, { Component } from 'react';
import { Text, View, Animated, Button } from 'react-native';

import Filter from './components/Filter';
import SondageList from './components/SondageList';

export default class SondagePage extends Component {

  state = {
    fadeFlex : new Animated.Value(0),
    flexValue : 0, 
  }

  openFilter(){
    Animated.timing(                  // Animate over time
      this.state.fadeFlex,            // The animated value to drive
      {
        toValue: this.state.flexValue,                   
        duration: 500,              
      }
    ).start();
    this.state.flexValue == 0 ? this.setState({flexValue:6}) : this.setState({flexValue:0});
  }

  render() {
    
    return (
        <View style={{ flex: 1 }}>
            <Button
              onPress={() => {this.openFilter();}}
              title="Filtres"
              accessibilityLabel="Cliquer ici pour filtrer les sondages"
            />  
            <Animated.View style={{ flex: this.state.fadeFlex}}>
              <Filter />
            </Animated.View>    
            <View style={{ flex: 6 }}>
              <SondageList />
            </View>  
        </View>
    );
  }
}

