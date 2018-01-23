import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { Screen, NavigationBar, Caption, View, ListView, Heading, Icon, Title, Button, Text, Image , TouchableOpacity, Tile} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Animation from 'lottie-react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {setConnectedUser, updateAvailablesReductions, updateAvailablesCadeaux, updateCounterReductions, updateCounterCadeaux } from '../../../actions'

import anim from '../../../assets/animations/trophy.json';
import ReductionElement from './ReductionElement';

let _carousel;
const {width, height} = Dimensions.get('window');
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});


class ReductionCadeaux extends Component {
 
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      activeSlide : 0,
    }

    this.renderItem = this.renderItem.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.removePoints = this.removePoints.bind(this);

  }

  
  renderRow(reduction){
    return(
      <ReductionElement 
          title={reduction.title}
          points={reduction.points}
          image={reduction.url}
          description={reduction.description}
      />
    );

  }

  renderItem({item,index}){
    return(
      <ReductionElement
          afficherModal={this.displayModal}
          largueur={0.8 * width} 
          title={item.title}
          points={item.points}
          image={item.url}
          description={item.description}
      />
    );
  }

  displayModal(title,points){
    this.setState({
      title : title,
      points : points,
    });
    this.popupDialog.show();
  }

  removePoints(points){
    
    var cloneOfA = JSON.parse(JSON.stringify(this.props.userData));
    var newPoints = Number(this.props.userData[0].points) - Number(points);
    cloneOfA[0]={};
    cloneOfA[0]._id=this.props.userData[0]._id;
    cloneOfA[0].id_facebook=this.props.userData[0].id_facebook;
    cloneOfA[0].username=this.props.userData[0].username;
    cloneOfA[0].login=this.props.userData[0].login;
    cloneOfA[0].mdp=this.props.userData[0].mdp;
    cloneOfA[0].owner=this.props.
    userData[0].owner;
    cloneOfA[0].points=newPoints;
    cloneOfA[0].url_fb_picture=this.props.userData[0].url_fb_picture;
    cloneOfA[0].surveys=this.props.userData[0].surveys;
    this.props.dispatch(setConnectedUser(cloneOfA));
    return fetch('http://195.154.107.158:1337/profil/removePoints/page?id='+this.props.userData[0]._id+"&points="+newPoints)
      .then((response) => response.json())
      .then((responseJson) => {
        var a = responseJson;
        var myJSONCadeaux = {
          cadeaux: []
        };
        var myJSONReductions = {
          reductions: []
        };
        var countCadeaux=0;
        var countReductions=0;
        a.map(function(item) {        
          if(item.cadeaux_type==1){
            countCadeaux++;
            myJSONCadeaux.cadeaux.push(
              item
            );
          }
          else if(item.cadeaux_type==2){
            countReductions++;
            myJSONReductions.reductions.push(
              item
            );
          }
        });
        
        this.setState({countReductions:countReductions, countCadeaux:countCadeaux});
        this.props.dispatch(updateAvailablesCadeaux({
            listCadeaux: myJSONCadeaux,
        }));
        this.props.dispatch(updateAvailablesReductions({
            listReductions: myJSONReductions,
        }));
        this.props.dispatch(updateCounterReductions({
            counterReductions: countReductions,
        }));
        this.props.dispatch(updateCounterCadeaux({
            counterCadeaux: countCadeaux,
        }));

      })
      .catch((error) => {
        console.error(error);
      });

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
      <View
          style={{flex:1}}
          styleName="vertical h-center v-center"
        >
          <NavigationBar
            style={{margin:5, elevation:4}}
            styleName="inline"
            hasHistory
            centerComponent={
                <Title styleName="bold h-center" numberOfLines={1}>
                    Réductions disponibles
                </Title>
            }
            navigateBack={ () => {
                const navigateBack = NavigationActions.back()
                this.props.navigation.dispatch(navigateBack);
            }}
          />
          <Carousel
            ref={(c) => { _carousel = c; }}
            data={this.props.reductionReducer.listReductions.reductions}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={ 0.8 * width}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            activeSlideAlignment='start'
            enableMomentum={true}
            loop={true}
          />

          <PopupDialog
              //dialogTitle={<DialogTitle title="Validation" />}
              ref={(popupDialog) => this.popupDialog = popupDialog }
              dialogAnimation={slideAnimation}
              width={0.9}
          >
            <Tile styleName="text-centric">
              <Title styleName="sm-gutter-bottom">Vous êtes sur le point dépenser {this.state.points} points pour obtenir : {this.state.title}</Title>
              <Caption>Une confirmation de la commande vous sera envoyée par mail</Caption>
              <Button 
                styleName="secondary md-gutter-top"
                onPress={()=>{
                    this.removePoints(this.state.points);
                    this.popupDialog.dismiss();
                }}
              >
                <Text>Valider la commande</Text>
              </Button>
            </Tile>  
          </PopupDialog>
      </View> 
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
      reductionReducer : state.reductionReducer.listReductions,
      userData : state.profilReducer.connected,

    }
}

export default connect(mapStateToProps)(ReductionCadeaux);