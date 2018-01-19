import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Title, Button, Text, Overlay, Subtitle, Tile, Image, TouchableOpacity , Icon} from '@shoutem/ui';
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
            <Tile styleName="text-centric">
              <Title styleName="md-gutter-bottom">{this.props.completedSurveysReducer.totalCompletedSurveys} SONDAGES DEJA COMPLETES GRACE A CYTi</Title>
              <Overlay styleName="solid-dark">
                <Subtitle styleName="md-gutter-horizontal">Voir</Subtitle>
              </Overlay>
            </Tile>
        </TouchableOpacity>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
      completedSurveysReducer : state.profilReducer.completedSurveys,
    }
  }

export default connect(mapStateToProps)(CompletedSurveys);