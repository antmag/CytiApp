import React, { Component } from 'react';
import { View, Button, Heading, Divider} from '@shoutem/ui';

export default class ReponseOuiNon extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <View styleName="vertical flexible" style={{flex : 1}}>
                <Button styleName="full-width" onPress={() =>  this.props.next() }>
                    <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button styleName="full-width" onPress={() =>  this.props.next() }>
                    <Heading>NON</Heading>
                </Button>
            </View>
        );
    }
}