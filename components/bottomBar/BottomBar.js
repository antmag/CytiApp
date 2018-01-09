import React from 'react';
//import { View, Text, Platform } from 'react-native';
import { View, Text, Platform, Icon, NavigationBar } from '@shoutem/ui';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
// import Icon from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import SondagePage from '../sondage/SondagePage';
import CadeauxPage from '../cadeaux/CadeauxPage';

const Cadeaux = () => (
  <CadeauxPage />
);

const Sondages = () => (
  <SondagePage />
);

const Profil = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profil</Text>
  </View>
);

const BottomBar = TabNavigator({
  Cadeaux: {
    screen: Cadeaux,
    navigationOptions: {
      tabBarLabel: 'Cadeaux',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Icon
        //   //name={Platform.OS == "ios" ? 'ios-ribbon' : 'md-ribbon'}
        //   name="gift"
        //   size={30}
        //   style={{ color: tintColor }}
        // />
        <Icon name="gift" />

      ),
    },
  },
  Sondage: {
    screen: Sondages,
    navigationOptions: {
      tabBarLabel: 'Sondages',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Icon
        //   //name={Platform.OS == "ios" ? 'ios-paper' : 'md-paper'}
        //   name="pencil-square-o"
        //   size={30}
        //   style={{ color: tintColor }}
        // />
        <Icon name="page" />
      ),
    },
  },
  Profil: {
    screen: Profil,
    navigationOptions: {
      tabBarLabel: 'Profil',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Icon
        //   //name={Platform.OS == "ios" ? 'ios-person' : 'md-person'}
        //   name="user-o"
        //   size={30}
        //   style={{ color: tintColor }}
        // />
        <Icon name="user-profile" />
      ),
    },
  },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    initialRouteName: 'Sondage',
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: 'black',
      },
      showIcon: true,
      indicatorStyle:{
        display: 'none',
      },
      style: {
        shadowOffset: {width:0,heigth:100},
        backgroundColor: 'white',
      }
    },
});

export default BottomBar;