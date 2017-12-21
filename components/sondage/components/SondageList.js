import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Animation from 'lottie-react-native';

import SondagePreview from './SondagePreview';

import anim from '../../../assets/animations/soda_loader.json';

export default class SondageList extends Component {

  launchAnimation(){
    this.animation.play(30,120);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Les vernis à ongles'},
            {key: 'Les marques de prêt à porter'},
            {key: 'Les desserts'},
            {key: 'Les courses de Noël'},
            {key: 'Un super Sondage'},
            {key: 'Encore un autre'},
            {key: 'Un sondage sur pleins de questions'},
          ]}
          renderItem={({item}) => <SondagePreview 
                                    title={item.key}
                                    image='../../../assets/images/survey.jpg' 
                                  />}
        />
        {/* <Button
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
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#A6207E'
    backgroundColor: 'white'
  },
});