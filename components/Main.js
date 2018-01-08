
import React, { Component } from 'react';
import { View } from 'react-native';

import BottomBar from './bottomBar/BottomBar';
import Topbar from './topbar/Topbar';

export default class Main extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Topbar />
                <BottomBar />
            </View>
        );
    }


}