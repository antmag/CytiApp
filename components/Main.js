
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import BottomBar from './bottomBar/BottomBar';
import Topbar from './topbar/Topbar';

import {setNavigator} from '../actions';

class Main extends Component{

    render(){
        this.props.dispatch(setNavigator(this.props.navigation));
        return (
            <View style={{flex:1}}>
                <Topbar navigation={this.props.navigation}/>
                <BottomBar />
            </View>
        );
    }
}

export default connect()(Main);