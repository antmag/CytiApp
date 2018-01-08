import React, { Component } from 'react';
import {View,
    Image,
    StatusBar,
    Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import { Screen, NavigationBar, Title, Heading } from '@shoutem/ui';
import Swiper from 'react-native-swiper';
import Animation from 'lottie-react-native';

import anim from '../../../assets/animations/emoji_tongue.json';

// Types de questions possibles:
// Yes-no
// Choix multiple parmis liste
// Choix unique parmis liste 

const { width, height } = Dimensions.get('window');
const styles = {
    wrapper: {
      // backgroundColor: '#f00'
    },
  
    slide: {
      //flex: 1,
      backgroundColor: 'transparent'
    },
    container: {
      flex: 1,
    },
  }


class ReponseSondage extends Component {

    constructor(props){
        super(props);
        this.setupQuestions = this.setupQuestions.bind(this);
        this.state = {
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

    setupQuestions(){
      let questionList = [];
      let questionListLength = Object.keys(this.state.questions).length;
      for(let i=0;i<questionListLength;i++){
        questionList.push((
          <View>
            <Heading>{this.state.questions[i].txt}</Heading>
          </View>
        ));
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
              
              <Swiper style={styles.wrapper}
                dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                activeDot={<View style={{backgroundColor: '#000', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                paginationStyle={{
                  bottom: 40
                }}
                loop={false}
                bounces={true}>

                {questions}                

              </Swiper>
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