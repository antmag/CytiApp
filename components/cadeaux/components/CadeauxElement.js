import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Caption, Image, View, Icon, Row, Divider, TouchableOpacity, Subtitle, Button, Text, Tile, Title } from '@shoutem/ui';

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
                    <Tile>
                      <Image
                        styleName="large-banner"
                        source={{ uri: this.state.image }}
                      >
                      </Image>
                      <View styleName="content">
                        <Title>{this.state.title}</Title>
                        <View styleName="horizontal space-between">
                          <Caption>{this.state.points} points</Caption>
                        </View>
                      </View>
                    </Tile>
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