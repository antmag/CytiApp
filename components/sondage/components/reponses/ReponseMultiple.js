import React, { Component } from 'react';
import {ListView, View, Button, Text, Icon} from '@shoutem/ui';

export default class ReponseMultiple extends Component {

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
                <Button styleName="full-width muted" onPress={() => {
                    //TODO: change the answer
                    // this.state.reponses[reponse.value.id_answer].selected = false;
                    // this.setState(this.state);
                    // setOpacityTo(1);
                    // console.log('Unselect');
                    // console.log('State: ' + this.state.reponses[reponse.value.id_answer].selected);
                    this.props.addAnswer(this.props.id, reponse._id);
                }}>
                    <Text>{reponse.txt}</Text>
                </Button>
            );
        }
        
        return(
            <Button styleName="full-width" onPress={() => {
                //TODO: change the answer
                // this.state.reponses[reponse.value.id_answer].selected = true;
                // this.setState(this.state);
                // setOpacityTo(0);
                // console.log('Select');
                // console.log('State: ' + this.state.reponses[reponse.value.id_answer].selected);
                this.props.addAnswer(this.props.id, reponse._id);
            }}>
                <Text>{reponse.txt}</Text>
            </Button>    
        );
    }

    render(){

        return (
            <View style={{flex:1}}>
                <View style={{flex:6, paddingBottom:5}}>
                    <ListView
                        data={this.props.reponses}
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