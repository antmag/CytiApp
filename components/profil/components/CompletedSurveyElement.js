import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Caption, Image, View, Icon, Row, Divider, TouchableOpacity, Subtitle, Button, Text, Tile, Title } from '@shoutem/ui';

import {updateSelectedReduction} from '../../../actions';

class CompletedSurveyElement extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            points: this.props.points,
            description : this.props.description,
            image : this.props.image
        };
    }

    render() {

        return (
            <View>
                <Row>
                    <Image
                        styleName="small rounded-corners"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
                    />
                    <View styleName="vertical stretch space-between">
                    <Subtitle>{this.state.title}</Subtitle>
                    <Caption>{this.state.points} points</Caption>
                  </View>
                  <Button styleName="right-icon"><Icon name="checkbox-on" /></Button>
                </Row>
                <Divider styleName="line" />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(CompletedSurveyElement);