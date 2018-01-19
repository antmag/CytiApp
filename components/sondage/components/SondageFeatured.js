import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Caption, Image, View, TouchableOpacity, Title, Tile } from '@shoutem/ui';

import {updateSelectedSondage} from '../../../actions';

class SondageFeatured extends Component {
    
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
            <TouchableOpacity
                style={{width:'99%', backgroundColor:'white'}}
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'ReponseSondage'});
                    this.props.navigation.dispatch(navigate);
                    this.props.dispatch(updateSelectedSondage({
                        id: this.props.id,
                        title: this.props.title,
                        description: this.props.description,
                        image: this.props.image,
                        duree: this.props.duree,
                    }));
                }}
            >
                <Image
                    style={{
                        backgroundColor:'white',
                        margin : 5,
                        elevation : 2
                    }}
                    styleName="large-banner"
                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
                >
                    <Tile>
                        <Title styleName="md-gutter-bottom">{this.state.title}</Title>
                        <Caption styleName="sm-gutter-horizontal">{this.state.description}</Caption>
                    </Tile>
                </Image>
            </TouchableOpacity>    
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(SondageFeatured);