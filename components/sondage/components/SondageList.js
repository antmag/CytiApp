import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animation from 'lottie-react-native';

import anim from '../../../assets/animations/soda_loader.json';

export default class SondageList extends Component {
  // componentDidMount() {
  //   this.animation.play();
  // }

  launchAnimation(){
    this.animation.play(30,120);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
              onPress={() => {this.launchAnimation();}}
              title="push to launch"
        />  
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 80,
              height: 80
            }}
            // loop={true}
            source={anim}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6207E'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
});