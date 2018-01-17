import React, { Component } from 'react';
import {ListView, View, Button, Text} from '@shoutem/ui';

export default class ReponseUnique extends Component {

    constructor(props){
        super(props);

        // //Setup the answers
        // let reponseList = [];
        // let reponseListLength = Object.keys(this.props.reponses).length;
        // for(let i=0;i<reponseListLength;i++){
        //     reponseList.push({
        //         value : this.props.reponses[i],
        //         selected : false
        //     });
        // }
        
        // this.state = {
        //     reponses : reponseList
        // }

        this.renderRow = this.renderRow.bind(this);

    }

    renderRow(reponse){
        
        if(reponse.selected){
            return(
                <Button styleName="full-width secondary" onPress={() => {
                    this.props.addAnswer(this.props.id, reponse._id);
                    this.props.next();
                }}>
                    <Text>{reponse.txt}</Text>
                </Button>
            );
        }
        
        return(
            <Button styleName="full-width" onPress={() => {
                this.props.addAnswer(this.props.id, reponse._id);
                this.props.next();
            }}>
                <Text>{reponse.txt}</Text>
            </Button>
        );
    }

    render(){

        console.log(this.props.reponses);
        return (
            <View style={{flex:1}} styleName="v-center">
                <ListView
                    data={this.props.reponses}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

}