import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Screen, NavigationBar, Caption, View, ListView, Heading, Icon, Title, Button, Text, Image , TouchableOpacity} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import Animation from 'lottie-react-native';
import anim from '../../../assets/animations/gift.json';
import CadeauxElement from './CadeauxElement';

class PhysiqueCadeaux extends Component {
 
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      isLoading: true,
    }

  }

  
  renderRow(cadeau){
    return(
      <CadeauxElement 
          title={cadeau.title}
          points={cadeau.points}
          image={cadeau.image}
          description={cadeau.description}
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
                            Availables presents
                        </Title>
                    }
                    navigateBack={ () => {
                        const navigateBack = NavigationActions.back()
                        this.props.navigation.dispatch(navigateBack);
                    }}
                />
                <View>

                  <ListView 
                    data={this.props.cadeauxReducer.listCadeaux.cadeaux}
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
        cadeauxReducer : state.cadeauReducer.listCadeaux,
    }
}

export default connect(mapStateToProps)(PhysiqueCadeaux);