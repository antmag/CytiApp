import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Screen, NavigationBar, Caption, View, ListView, Heading, Icon, Title, Button, Text, Image , TouchableOpacity} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import Animation from 'lottie-react-native';
import anim from '../../../assets/animations/trophy.json';
import ReductionElement from './ReductionElement';
import SelectedReduction from './SelectedReduction';


class ReductionCadeaux extends Component {
 
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      isLoading: true,
      sondages : [
        {key: 'Tee shirt Nike style',
        points: '125',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Lacoste',
        points: '25',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Sergio Tachini',
        points: '145',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Puma',
        points: '115',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Under Armour',
        points: '12',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Hilfiger',
        points: '1253',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Tee shirt Adidas',
        points: '1',
        image: "../../../assets/images/survey.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
      ]
    }

  }

  
  renderRow(reduction){
    return(
      <ReductionElement 
          title={reduction.key}
          image={reduction.image}
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
                            Availables vouchers
                        </Title>
                    }
                    navigateBack={ () => {
                        const navigateBack = NavigationActions.back()
                        this.props.navigation.dispatch(navigateBack);
                    }}
                />
                <View>
                  <ListView 
                    data={this.state.sondages}
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
    }
}

export default connect(mapStateToProps)(ReductionCadeaux);