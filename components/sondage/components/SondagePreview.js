import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Caption, Image, View, Icon, Row, Divider, TouchableOpacity, Subtitle, Button, Text } from '@shoutem/ui';

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
                        styleName="small rounded-corners top"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
                    />
                    <View styleName="vertical stretch space-between">
                        <Subtitle>{this.state.title}</Subtitle>
                        <Caption>{this.state.description}</Caption>
                    </View>
                </Row>
                <Divider styleName="line" />
            </TouchableOpacity>    
        );
    }
}
