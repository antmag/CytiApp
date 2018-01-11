import React, { Component } from 'react';
import {ListView, View, Button, Text} from '@shoutem/ui';

let _this;

export default class ReponseUnique extends Component {

    constructor(props){
        super(props);

        //Setup the answers
        let reponseList = [];
        let reponseListLength = Object.keys(this.props.reponses).length;
        for(let i=0;i<reponseListLength;i++){
            reponseList.push({
                value : this.props.reponses[i],
                selected : false
            });
        }
        
        this.state = {
            reponses : reponseList
        }

        _this = this;
    }

    renderRow(reponse){
        
        if(reponse.selected){
            return(
                <Button styleName="full-width secondary" onPress={() => {
                    //TODO: change the answer
                    reponse.selected = false;
                    _this.props.next();
                }}>
                    <Text>{reponse.value.txt}</Text>
                </Button>
            );
        }
        
        return(
            <Button styleName="full-width" onPress={() => {
                //TODO: change the answer
                reponse.selected = true;
                _this.props.next();
            }}>
                <Text>{reponse.value.txt}</Text>
            </Button>
        );
    }

    render(){

        return (
            <View style={{flex:1}} styleName="v-center">
                <ListView
                    data={this.state.reponses}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

}