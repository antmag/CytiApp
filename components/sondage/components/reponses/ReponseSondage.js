import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import { Screen, NavigationBar, Title, Card, View, Divider, Button, Text, Icon, Heading } from '@shoutem/ui';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ReponseOuiNon from './ReponseOuiNon';
import ReponseUnique from './ReponseUnique';
import ReponseMultiple from './ReponseMultiple';

// Types de questions possibles:
// Yes-no
// Choix multiple parmis liste
// Choix unique parmis liste 

const { width, height } = Dimensions.get('window');
let _carousel;

class ReponseSondage extends Component {

    constructor(props){
        super(props);
        this.setupQuestions = this.setupQuestions.bind(this);
        this.state = {
            activeSlide : 0,
            reponses : {},
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
        };
    }

    _renderItem ({item, index}) {
      
      let template;
      if(item.question_type === 'YesNo')
        template = (<ReponseOuiNon 
                      next = { () => _carousel.snapToNext()}
                    />);
      else if (item.question_type === 'unique')
        template = (<ReponseUnique 
                      next = { () => _carousel.snapToNext()} 
                      reponses = { item.answers }
                    />);
      else if (item.question_type === 'multiple')
        template = (<ReponseMultiple 
                      next={ () => _carousel.snapToNext()} 
                      reponses = { item.answers }  
                    />);

      return (
          <Card style={{width : width * 0.85, flex : 1, marginTop : 50, marginBottom : 50}}>
            <View styleName="content">
              <Title styleName="md-gutter-bottom h-center">{item.txt}</Title>
              <Divider styleName="line" />
              {template}
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
                ref={(c) =>  _carousel = c }
                data = { questions }
                renderItem = { this._renderItem }
                sliderWidth = { width }
                itemWidth = { width * 0.85 }
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                enableSnap={true}
                enableMomentum={true}
              />

              <Pagination
                activeDotIndex = {this.state.activeSlide }
                dotsLength = { questions.length }
                carouselRef = { _carousel }
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