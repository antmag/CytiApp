import React from 'react';
//import { View, Text, Platform } from 'react-native';
import { View, Text, Platform, Icon, NavigationBar } from '@shoutem/ui';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Icons from 'react-native-vector-icons/SimpleLineIcons'; // 4.4.2

import SondagePage from '../sondage/SondagePage';
import CadeauxPage from '../cadeaux/CadeauxPage';

import Profil from '../profil/Profil';

const Cadeaux = () => (
  <CadeauxPage />
);

const Sondages = () => (
  <SondagePage />
);

const profil = () => (
  <Profil />
);

const BottomBar = TabNavigator({
  Cadeaux: {
    screen: Cadeaux,
    navigationOptions: {
      tabBarLabel: 'Cadeaux',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icons
          name="present"
          size={20}
          color={tintColor}
        />
        // <Icon name="gift" />

      ),
    },
  },
  Sondage: {
    screen: Sondages,
    navigationOptions: {
      tabBarLabel: 'Sondages',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icons
          name="book-open"
          size={20}
          color={tintColor}
        />
        // <Icon name="page" />
      ),
    },
  },
  Profil: {
    screen: profil,
    navigationOptions: {
      tabBarLabel: 'Profil',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icons
          name="user"
          size={20}
          color={tintColor}
        />
        // <Icon name="user-profile" />
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
        color: 'white',
      },
      showIcon: true,
      indicatorStyle:{
        display: 'none',
      },
      style: {
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
        elevation : 0,
      }
    },
});

export default BottomBar;