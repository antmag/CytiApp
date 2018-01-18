
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { ListView, View, GridRow, TouchableOpacity, Card, Image, Subtitle, Caption } from '@shoutem/ui';

import {updateSelectedSondage} from '../../../actions';

class SondageCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            description : this.props.description,
            image : this.props.image,
            duree : this.props.duree
        };
    }

    render(){

        return(
            <TouchableOpacity key={this.props.idRow} styleName="flexible" style={{padding:5}}
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
                <Card styleName="flexible" style={{backgroundColor:'white',elevation:2,overflow:'visible'}}>
                    <Image
                        styleName="medium-wide"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'  }}
                    />
                    <View styleName="content">
                        <Subtitle numberOfLines={3}>{this.state.title}</Subtitle>
                        <View styleName="horizontal">
                        <Caption styleName="collapsible" numberOfLines={2}>{this.state.description}</Caption>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(SondageCard);