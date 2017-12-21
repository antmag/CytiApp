import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Caption, Image, View, Icon, Row, Divider, Title, TouchableOpacity } from '@shoutem/ui';

export default class SondagePreview extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            description : this.props.description,
            image : this.props.image,
            duree : this.props.duree
        };
    }

    render() {
        return (
            <TouchableOpacity>
                <Row>
                    <Image
                        styleName="small rounded-corners"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
                    />
                    <View styleName="vertical stretch space-between">
                        <Title>{this.state.title}</Title>
                        <Caption>{this.state.description}</Caption>
                    </View>
                </Row>
                <Divider styleName="line" />
            </TouchableOpacity>    
        );
    }
}
