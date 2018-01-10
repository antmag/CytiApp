import React, { Component } from 'react';
import {ListView, View, Button, Text} from '@shoutem/ui';

let _this;

export default class ReponseUnique extends Component {

    constructor(props){
        super(props);
        this.setupReponses = this.setupReponses.bind(this);
        _this = this;
    }

    setupReponses(){
        let reponseList = [];
        let reponseListLength = Object.keys(this.props.reponses).length;
        for(let i=0;i<reponseListLength;i++){
            reponseList.push(this.props.reponses[i]);
        }
        return reponseList;
    }

    renderRow(reponse){
        return(
            <Button styleName="full-width" onPress={() =>  _this.props.next() }>
                <Text>{reponse.txt}</Text>
            </Button>
        );
    }

    render(){

        const reponses = this.setupReponses();

        return (
            <View style={{flex:1}} styleName="v-center">
                <ListView
                    data={reponses}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

}