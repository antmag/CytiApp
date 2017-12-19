import React from 'react';
import { View, Text, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import Sondage from '../sondage/Sondage';

const Cadeaux = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Cadeaux</Text>
  </View>
);

const Sondages = () => (
  <Sondage />
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
        <Icon
          //name={Platform.OS == "ios" ? 'ios-ribbon' : 'md-ribbon'}
          name="gift"
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Sondage: {
    screen: Sondages,
    navigationOptions: {
      tabBarLabel: 'Sondages',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          //name={Platform.OS == "ios" ? 'ios-paper' : 'md-paper'}
          name="pencil-square-o"
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profil: {
    screen: Profil,
    navigationOptions: {
      tabBarLabel: 'Profil',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          //name={Platform.OS == "ios" ? 'ios-person' : 'md-person'}
          name="user-o"
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    initialRouteName: 'Sondage',
    tabBarOptions: {
      labelStyle: {
        fontSize: 10,
      },
      showIcon: true,
      indicatorStyle:{
        display: 'none',
      }
    },
});

export default BottomBar;