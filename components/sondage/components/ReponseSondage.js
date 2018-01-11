import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import { Screen, NavigationBar, Title, Card, View, Divider, Button, Text, Icon, Heading } from '@shoutem/ui';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Types de questions possibles:
// Yes-no
// Choix multiple parmis liste
// Choix unique parmis liste 

const { width, height } = Dimensions.get('window');

class ReponseSondage extends Component {

    constructor(props){
        super(props);
        this.setupQuestions = this.setupQuestions.bind(this);
        this.reponseOuiNon = this.reponseOuiNon.bind(this);
        this.state = {
            entries : [],
            activeSlide : 0,
            "questions": {
                "0":
                {
                  "position" : 0,
                  "txt" : "Te maquilles tu régulièrement ?",
                  "question_type" : "YesNo",
                  "mandatory" : true,
                  "answers" : {}
                },
                "1":
                {
                  "position": 1,
                  "txt" : "Comment réveiller des yeux fatigués ?",
                  "question_type" : "unique",
                  "mandatory" : true,
                  "answers" : {
                    "0":
                    {
                      "id_answer" : "",
                      "position": "0",
                      "txt" : "La solution make-up"
                    },
                    "1":
                    {
                      "id_answer" : "1",
                      "position": "1",
                      "txt" : "La solution médicale"
                    }
                  }
                },
                "2":
                {
                  "position": 2,
                  "txt" : "Qu'est ce qui est important pour toi ?",
                  "question_type" : "multiple",
                  "mandatory" : false,
                  "answers" : {
                    "0":
                    {
                      "id_answer" : "0",
                      "position": "0",
                      "txt" : "Le nez"
                    },
                    "1":
                    {
                      "id_answer" : "1",
                      "position": "1",
                      "txt" : "La bouche"
                    },
                    "2":
                    {
                      "id_answer" : "2",
                      "position": "2",
                      "txt" : "Les yeux"
                    },
                    "3":
                    {
                      "id_answer" : "3",
                      "position": "3",
                      "txt" : "Le teint"
                    },
                    "4":
                    {
                      "id_answer" : "4",
                      "position": "4",
                      "txt" : "Les cheveux"
                    }
                  }
                }
              }
        }
    }

    reponseOuiNon(){

    }

    _renderItem ({item, index}) {
      console.log(this.state);
      return (
          <Card style={{width : width * 0.85, flex : 1, marginTop : 50, marginBottom : 50}}>
            <View styleName="content">
              <Title styleName="md-gutter-bottom h-center">{item.txt}</Title>
              <Divider styleName="line" />
              <View styleName="vertical flexible" style={{flex : 1}}>
                <Button styleName="full-width" onPress={() => { this._carousel.snapToNext(); }}>
                  <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button styleName="full-width">
                  <Heading>NON</Heading>
                </Button>
              </View>  
              {/* <Divider styleName="line" />
              <View styleName="horizontal flexible">
                <Button styleName="full-width" onPress={() => this._carousel.snapToPrev()}>
                  <Icon name="left-arrow" />
                  <Text>Précédent</Text>
                </Button>
                <Button styleName="full-width" onPress={() => this._carousel.snapToNext()}>
                  <Text>Suivant</Text>
                  <Icon name="right-arrow" />
                </Button>
              </View> */}
            </View> 
          </Card>
      );
    }

    setupQuestions(){
      let questionList = [];
      let questionListLength = Object.keys(this.state.questions).length;
      for(let i=0;i<questionListLength;i++){
        questionList.push(this.state.questions[i]);
      }
      return questionList;
    }



    render() {
        
      let questions = this.setupQuestions();

      return(
          <Screen>
              <NavigationBar
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
                ref={(c) => { this._carousel = c; }}
                data = { questions }
                renderItem = { this._renderItem }
                sliderWidth = { width }
                itemWidth = { width * 0.85 }
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                enableSnap={true}
                enableMomentum={true}
              />

              <Pagination
                activeDotIndex = { this._carousel ?this._carousel.currentIndex : this.state.activeSlide }
                dotsLength = { questions.length }
                carouselRef = { this._carousel }
                tappableDots = { true }
              />

          </Screen>  
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        navigation : state.navigationReducer.navigator,
        sondage: state.sondageReducer.sondage,
    }
}

export default connect(mapStateToProps)(ReponseSondage);