import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Caption, Image, View, Tile, Title, Heading, Button, Icon, Text, Overlay } from '@shoutem/ui';

import {updateSelectedCadeau} from '../../../actions';

class CadeauxElement extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            largueur : this.props.largueur,
            title : this.props.title,
            points: this.props.points,
            description : this.props.description,
            image : this.props.image
        };
    }

    render() {

        return (
            <Tile
                style={{margin:5,marginTop:40,elevation:2}}
            >
                <Image
                    styleName="large"
                    source={{ uri: this.state.image }}
                    style={{width : this.state.largueur}} 
                >
                    <Overlay styleName="solid-bright">
                        <Heading styleName="sm-gutter-top">{this.state.points} points</Heading>
                    </Overlay>
                </Image>
                <View styleName="content h-center v-center">
                    <Title styleName="md-gutter-top">{this.state.title}</Title>
                    <Caption styleName="sm-gutter-top">{this.state.description}</Caption>
                    <Button 
                        styleName="md-gutter-top secondary"
                        onPress={() => {
                            // const navigate = NavigationActions.navigate({routeName:'SelectedCadeau'});
                            // this.props.navigation.dispatch(navigate);
                            // this.props.dispatch(updateSelectedCadeau({
                            //     title: this.state.title,
                            //     points:this.state.points,
                            //     description: this.state.description,
                            //     image: this.state.image,
                            // }));
                            this.props.afficherModal(this.state.title, this.state.points);
                        }}
                    >
                        <Icon name="cart" /><Text>COMMANDER</Text>
                    </Button>
                </View>    
            </Tile>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(CadeauxElement);