import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image, TouchableOpacity } from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';

class CadeauxPreview extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
    
    return (
          <TouchableOpacity
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'PhysiqueCadeaux'});
                    this.props.navigation.dispatch(navigate);
                }}
          >
          <View style={{marginLeft:50 }}>
            <Icon name="gift" />
          </View>
        </TouchableOpacity>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(CadeauxPreview);