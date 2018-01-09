import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Caption, Image, View, Icon, Row, Divider, TouchableOpacity, Subtitle, Button, Text } from '@shoutem/ui';

import {updateSelectedCadeau} from '../../../actions';

class ReductionElement extends Component {
    
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

                <TouchableOpacity
                        onPress={() => {
                            const navigate = NavigationActions.navigate({routeName:'SelectedCadeau'});
                            this.props.navigation.dispatch(navigate);
                            this.props.dispatch(updateSelectedCadeau({
                            title: this.props.title,
                            points:this.props.points,
                            description: this.props.description,
                            image: this.props.image,
                        }));
                        }}
                >
                <Row>
                    <Image
                        styleName="small rounded-corners top"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
                    />
                    <View styleName="vertical stretch space-between">
                        <Subtitle>{this.state.title}</Subtitle>
                        <Subtitle>{this.state.points} points</Subtitle>
                        <Caption>{this.state.description}</Caption>
                    </View>
                </Row>
                </TouchableOpacity>
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

export default connect(mapStateToProps)(ReductionElement);