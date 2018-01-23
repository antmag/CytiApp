import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Animation from 'lottie-react-native'; 

import { Screen, NavigationBar, Title, Card, View, Divider, Button, Text, Icon, Heading, Image } from '@shoutem/ui';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ReponseOuiNon from './ReponseOuiNon';
import ReponseUnique from './ReponseUnique';
import ReponseMultiple from './ReponseMultiple';

import anim from '../../../../assets/animations/loader.json';
import {updateCompletedSurveys,setConnectedUser, updateAvailablesReductions, updateCounterReductions, updateCounterCadeaux, updateAvailablesCadeaux, updateCurrentAnswer, updateListSondage} from '../../../../actions';

const { width, height } = Dimensions.get('window');
let _carousel;

class ReponseSondage extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            activeSlide : 0,
            reponses : [],
            questions: []
        };
        this._renderItem = this._renderItem.bind(this);
        this.addMultipleAnswer = this.addMultipleAnswer.bind(this);
        this.sendUniqueAnswer = this.sendUniqueAnswer.bind(this);
        this.sendMultipleAnswer = this.sendMultipleAnswer.bind(this);
    }

    sendUniqueAnswer(id, reponse){
      let reponseJson = JSON.stringify({
        "id_contact": this.props.user[0]._id,
        "id_question": id,
        "id_reponse": [reponse]
      }); 
      fetch('http://195.154.107.158:1337/app/' + this.props.sondage.id + '/new_answer',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: reponseJson
      });
    }

    addMultipleAnswer(id, reponse){
      //Si le tableau n'existe pas on le créé
      if(this.state.reponses[id] === undefined){
        this.state.reponses[id] = [];
        this.state.reponses[id].push(reponse);
        return;
      }

      let index = this.state.reponses[id].indexOf(reponse);
      if(index !== -1){
        this.state.reponses[id].splice(index,1);
      } else {
        this.state.reponses[id].push(reponse);
      }
    }
    addMultipleAnswer(id, reponse){
      //Si le tableau n'existe pas on le créé
      if(this.state.reponses[id] === undefined){
        this.state.reponses[id] = [];
        this.state.reponses[id].push(reponse);
        return;
      }

      let index = this.state.reponses[id].indexOf(reponse);
      if(index !== -1){
        this.state.reponses[id].splice(index,1);
      } else {
        this.state.reponses[id].push(reponse);
      }
    }
    sendMultipleAnswer(id){

      if(this.state.reponses[id] === undefined) return;
      let reponseJson = JSON.stringify({
        "id_contact": this.props.user[0]._id,
        "id_question": id,
        "id_reponse": this.state.reponses[id]
      }); 
      fetch('http://195.154.107.158:1337/app/' + this.props.sondage.id + '/new_answer',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: reponseJson
      });
    }

    _renderItem ({item, index}) {
      
      let template;
      if(item.type === 'YesNo')
        template = (<ReponseOuiNon 
                      id = { item._id }
                      next = { () => _carousel.snapToNext()}
                      reponses = { item.answers }
                      addAnswer = { this.sendUniqueAnswer }
                      index={index}
                    />);
      else if (item.type === 'unique')
        template = (<ReponseUnique 
                      id = { item._id }
                      next = { () => _carousel.snapToNext()} 
                      reponses = { item.answers }
                      addAnswer = { this.sendUniqueAnswer }
                      index={index}
                    />);
      else if (item.type === 'multiple')
        template = (<ReponseMultiple 
                      id = { item._id }
                      next={ () => _carousel.snapToNext()} 
                      reponses = { item.answers } 
                      addAnswer = { this.addMultipleAnswer }
                      sendAnswer = { this.sendMultipleAnswer }
                      index={index}
                    />);

      return (
          <Card style={{width : width * 0.85, flex : 1, marginTop : 30, marginBottom : 0, elevation:2}}>
            <View styleName="content">
              <Title styleName="md-gutter-bottom h-center">{item.txt}</Title>
              <Divider styleName="line" />
              {template}
            </View> 
          </Card>
      );
    }

    componentDidMount() {
      
      this.animation.play();

      // Cherche les questions relatives au sondage
      return fetch('http://195.154.107.158:1337/app/' + this.props.sondage.id)
        .then((response) => response.json())
        .then((responseJson) => {

            var maMap=responseJson;
            var maMap2;
            Object.keys(responseJson).forEach(function(k, v){

              maMap2=maMap[k].answers;

              Object.keys(maMap[k].answers).forEach(function(kk, vv){

                maMap2[kk].slid=k;
                maMap2[kk].status=0;

              });

            });

            this.props.dispatch(updateCurrentAnswer(maMap));

            this.setState({
              isLoading: false,
              questions: maMap,
            });
        })
        .catch((error) => {
          console.error(error);
        });

    }

    render() {
      
      if(this.state.isLoading){
        return(
          <Screen>
            <NavigationBar
                style={{elevation:4}}
                styleName="inline"
                hasHistory
                centerComponent={
                    <Title styleName="bold h-center" numberOfLines={1}>
                        {this.props.sondage.title}
                    </Title>
                }
                navigateBack={ () => {
                    const navigateBack = NavigationActions.back()
                    this.props.navigation.dispatch(navigateBack);
                }}
            />
            <View styleName="vertical h-center v-center" style={{flex:1}}>
              <Animation
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 200,
                  height: 200
                }}
                loop={true}
                source={anim}
              />
            </View> 
          </Screen> 
        );
      }

      return(
          <Screen>
              <NavigationBar
                  style={{elevation:4}}
                  styleName="inline"
                  hasHistory
                  centerComponent={
                      <Title styleName="bold h-center" numberOfLines={1}>
                          {this.props.sondage.title}
                      </Title>
                  }
                  navigateBack={ () => {
                      const navigateBack = NavigationActions.back()
                      this.props.navigation.dispatch(navigateBack);
                  }}
              />

              <Carousel
                ref={(c) =>  _carousel = c }
                data = { this.state.questions }
                renderItem = { this._renderItem }
                sliderWidth = { width }
                itemWidth = { width * 0.85 }
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                enableSnap={true}
                enableMomentum={true}
              />

              <Pagination
                carouselRef = { _carousel }
                activeDotIndex = {this.state.activeSlide }
                dotsLength = { this.state.questions.length }
                tappableDots = { true }
              />

              <Button 
                styleName="secondary md-gutter-bottom" 
                style={{width:width * 0.85, marginLeft:'auto', marginRight:'auto'}}
                onPress = { () => {
                  fetch('http://195.154.107.158:1337/app/' + this.props.sondage.id + '/finish',{
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "id_user" : this.props.user[0]._id
                    })
                  });

                  
                  fetch('http://195.154.107.158:1337/profil/surveys/page?id_user='+this.props.user[0]._id)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                      isLoading: false,
                    });
                    this.props.dispatch(updateCompletedSurveys({
                        completedSurveys: responseJson.surveys,
                        totalCompletedSurveys: responseJson.total,
                        modeCompletedSurveys: responseJson.mode,
                        shoppingCompletedSurveys: responseJson.shopping,
                        sportCompletedSurveys: responseJson.sport,
                        beautyCompletedSurveys: responseJson.beauty,

                    }));

                  })
                  .catch((error) => {
                    console.error(error);
                  });

                var cloneOfA = JSON.parse(JSON.stringify(this.props.user));
                var newPoints = Number(this.props.user[0].points) + Number(this.props.sondage.points);
                cloneOfA[0]={};
                cloneOfA[0]._id=this.props.user[0]._id;
                cloneOfA[0].id_facebook=this.props.user[0].id_facebook;
                cloneOfA[0].username=this.props.user[0].username;
                cloneOfA[0].login=this.props.user[0].login;
                cloneOfA[0].mdp=this.props.user[0].mdp;
                cloneOfA[0].owner=this.props.
                user[0].owner;
                cloneOfA[0].points=newPoints;
                cloneOfA[0].url_fb_picture=this.props.user[0].url_fb_picture;
                cloneOfA[0].surveys=this.props.user[0].surveys;
                this.props.dispatch(setConnectedUser(cloneOfA));

                fetch('http://195.154.107.158:1337/cadeaux?points='+newPoints)
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

                  var sondage_id=this.props.sondage.id;
                  var cloneOfA = JSON.parse(JSON.stringify(this.props.listSondages));

                  this.props.listSondages.forEach(function(result, index) {
                    if(result["_id"] == sondage_id) {
                      //Remove from array
                      cloneOfA.splice(index, 1);
                    }    
                  });
                this.props.dispatch(updateListSondage(cloneOfA));
                  const navigateBack = NavigationActions.back();
                  this.props.navigation.dispatch(navigateBack);
                } }
              >
                <Text>Terminer le sondage</Text>
              </Button>
          </Screen>  
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        navigation : state.navigationReducer.navigator,
        sondage: state.sondageReducer.sondage,
        user: state.profilReducer.connected,
        listSondages : state.sondageReducer.listSondage,
    }
}

export default connect(mapStateToProps)(ReponseSondage);