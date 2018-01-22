import React, { Component } from 'react';
import { View, Button, Heading, Divider, TouchableOpacity} from '@shoutem/ui';

export default class ReponseOuiNon extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <View styleName="vertical flexible" style={{flex : 1}}>

                <Button styleName="full-width" onPress={() =>  {
                    this.props.addAnswer(this.props.id, this.props.reponses[0]._id);
                    this.props.next(); 
                }}>
                    <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button styleName="full-width" onPress={() =>  {
                    this.props.addAnswer(this.props.id, this.props.reponses[1]._id);
                    this.props.next(); 
                }}>
                    <Heading>NON</Heading>
                </Button>
            </View>
        );
    }
}