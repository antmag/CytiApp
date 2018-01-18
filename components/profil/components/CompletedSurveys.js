import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Title, Button, Text, Image, TouchableOpacity , Icon} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';

class CompletedSurveys extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
    return (

          <TouchableOpacity
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'CompletedSurveysList'});
                    this.props.navigation.dispatch(navigate);
                }}
          >
          <View style={{}}>
           <Text>completed surveys</Text>
           <Icon name="plus-button"/>
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

export default connect(mapStateToProps)(CompletedSurveys);