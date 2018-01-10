import React, { Component } from 'react';
import {ListView, View, Button, Text, Icon} from '@shoutem/ui';

export default class ReponseMultiple extends Component {

    constructor(props){
        super(props);
        this.setupReponses = this.setupReponses.bind(this);
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
            <Button styleName="full-width">
                <Text>{reponse.txt}</Text>
            </Button>    
        );
    }

    render(){

        const reponses = this.setupReponses();

        return (
            <View style={{flex:1}}>
                <View style={{flex:6, paddingBottom:5}}>
                    <ListView
                        data={reponses}
                        renderRow={this.renderRow}
                    />
                </View>
                <Button styleName="full-width secondary" onPress={() =>  this.props.next() }>
                    <Text>Suivant</Text>
                    <Icon name="right-arrow" />
                </Button>
            </View>    
        );
    }
}