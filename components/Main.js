
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View } from 'react-native';
import { Image } from '@shoutem/ui';

import BottomBar from './bottomBar/BottomBar';
import Topbar from './topbar/Topbar';

import {setNavigator} from '../actions';

const { width, height } = Dimensions.get('window');

class Main extends Component{

    render(){
        
        this.props.dispatch(setNavigator(this.props.navigation));
        
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <Topbar navigation={this.props.navigation}/>
                <BottomBar />
            </View>
        );
    }
}

export default connect()(Main);