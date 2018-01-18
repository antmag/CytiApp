import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Screen, NavigationBar, Caption, View, ListView, Heading, Icon, Title, Button, Text, Image , TouchableOpacity} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import Animation from 'lottie-react-native';
import anim from '../../../assets/animations/surveyCheck.json';
import ReductionElement from '../../cadeaux/components/ReductionElement';
import {updateCompletedSurveys} from '../../../actions';

class CompletedSurveysList extends Component {
 
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      isLoading: true,      
    }

  }

  
  renderRow(reduction){
    return(
      <ReductionElement 
          key={reduction.title}
          title={reduction.title}
          points={reduction.points}
          image={reduction.url}
          description={reduction.description}
      />
    );
  }

  componentDidMount() {

    //Play the loader animation

    this.animation.play();

    //TODO: Replace adress with the serveur
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          //TODO: Décommenter la ligne
          // sondages: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {
    
    if(this.state.isLoading){
      return(
        <View styleName="fill-parent vertical h-center v-center">
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 100,
              height: 100
            }}
            loop={true}
            source={anim}
          />
        </View>  
      );
    }

    return (
            <Screen>
                <NavigationBar
                    styleName="inline"
                    hasHistory
                    centerComponent={
                        <Title styleName="bold h-center" numberOfLines={1}>
                            Completed Surveys
                        </Title>
                    }
                    navigateBack={ () => {
                        const navigateBack = NavigationActions.back()
                        this.props.navigation.dispatch(navigateBack);
                    }}
                />
                <View>
                  <ListView 
                    data={this.props.completedSurveysReducer.completedSurveys.surveys}
                    renderRow={this.renderRow}
                  />
                </View>
            </Screen>  
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return{
        navigation : state.navigationReducer.navigator,
        reductionReducer : state.reductionReducer.listReductions,
        userData : state.profilReducer.connected,
        completedSurveysReducer : state.profilReducer.completedSurveys,
    }
}

export default connect(mapStateToProps)(CompletedSurveysList);