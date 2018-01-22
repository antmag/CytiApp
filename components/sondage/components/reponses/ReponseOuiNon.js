import React, { Component } from 'react';
import { View, Button, Heading, Divider, TouchableOpacity} from '@shoutem/ui';
import { connect } from 'react-redux';
import {updateCurrentAnswer} from '../../../../actions';


class ReponseOuiNon extends Component {

    constructor(props){
        super(props);
    }

    render(){

        if(this.props.answerSelected[this.props.index].answers[0].status == 0 && this.props.answerSelected[this.props.index].answers[1].status==0){
        return(
            <View styleName="vertical flexible" style={{flex : 1}}>
                <Button styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[0]={};
                    cloneOfA[this.props.index].answers[0]._id=this.props.answerSelected[this.props.index].answers[0]._id;
                    cloneOfA[this.props.index].answers[0].id_question=this.props.answerSelected[this.props.index].answers[0].id_question;
                    cloneOfA[this.props.index].answers[0].id_survey=this.props.answerSelected[this.props.index].answers[0].id_survey;
                    cloneOfA[this.props.index].answers[0].position=this.props.answerSelected[this.props.index].answers[0].position;
                    cloneOfA[this.props.index].answers[0].status=1;
                    cloneOfA[this.props.index].answers[0].txt=this.props.
                    answerSelected[this.props.index].answers[0].txt;
                    cloneOfA[this.props.index].answers[0].value=this.props.answerSelected[this.props.index].answers[0].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[0]._id);
                    this.props.next(); 
                }}>
                    <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[1]={};
                    cloneOfA[this.props.index].answers[1]._id=this.props.answerSelected[this.props.index].answers[1]._id;
                    cloneOfA[this.props.index].answers[1].id_question=this.props.answerSelected[this.props.index].answers[1].id_question;
                    cloneOfA[this.props.index].answers[1].id_survey=this.props.answerSelected[this.props.index].answers[1].id_survey;
                    cloneOfA[this.props.index].answers[1].position=this.props.answerSelected[this.props.index].answers[1].position;
                    cloneOfA[this.props.index].answers[1].status=1;
                    cloneOfA[this.props.index].answers[1].txt=this.props.
                    answerSelected[this.props.index].answers[1].txt;
                    cloneOfA[this.props.index].answers[1].value=this.props.answerSelected[this.props.index].answers[1].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[1]._id);
                    this.props.next(); 
                }}>
                    <Heading>NON</Heading>
                </Button>
            </View>
        );
        }else if(this.props.answerSelected[this.props.index].answers[0].status == 1 && this.props.answerSelected[this.props.index].answers[1].status==0){
        return(
            <View styleName="vertical flexible" style={{flex : 1}}>
                <Button style={{backgroundColor:'#ABABAB'}} styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[0]={};
                    cloneOfA[this.props.index].answers[0]._id=this.props.answerSelected[this.props.index].answers[0]._id;
                    cloneOfA[this.props.index].answers[0].id_question=this.props.answerSelected[this.props.index].answers[0].id_question;
                    cloneOfA[this.props.index].answers[0].id_survey=this.props.answerSelected[this.props.index].answers[0].id_survey;
                    cloneOfA[this.props.index].answers[0].position=this.props.answerSelected[this.props.index].answers[0].position;
                    cloneOfA[this.props.index].answers[0].status=0;
                    cloneOfA[this.props.index].answers[0].txt=this.props.
                    answerSelected[this.props.index].answers[0].txt;
                    cloneOfA[this.props.index].answers[0].value=this.props.answerSelected[this.props.index].answers[0].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[0]._id);
                    this.props.next(); 
                }}>
                    <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[1]={};
                    cloneOfA[this.props.index].answers[1]._id=this.props.answerSelected[this.props.index].answers[1]._id;
                    cloneOfA[this.props.index].answers[1].id_question=this.props.answerSelected[this.props.index].answers[1].id_question;
                    cloneOfA[this.props.index].answers[1].id_survey=this.props.answerSelected[this.props.index].answers[1].id_survey;
                    cloneOfA[this.props.index].answers[1].position=this.props.answerSelected[this.props.index].answers[1].position;
                    cloneOfA[this.props.index].answers[1].status=1;
                    cloneOfA[this.props.index].answers[1].txt=this.props.
                    answerSelected[this.props.index].answers[1].txt;
                    cloneOfA[this.props.index].answers[1].value=this.props.answerSelected[this.props.index].answers[1].value;
                    cloneOfA[this.props.index].answers[0]={};
                    cloneOfA[this.props.index].answers[0]._id=this.props.answerSelected[this.props.index].answers[0]._id;
                    cloneOfA[this.props.index].answers[0].id_question=this.props.answerSelected[this.props.index].answers[0].id_question;
                    cloneOfA[this.props.index].answers[0].id_survey=this.props.answerSelected[this.props.index].answers[0].id_survey;
                    cloneOfA[this.props.index].answers[0].position=this.props.answerSelected[this.props.index].answers[0].position;
                    cloneOfA[this.props.index].answers[0].status=0;
                    cloneOfA[this.props.index].answers[0].txt=this.props.
                    answerSelected[this.props.index].answers[0].txt;
                    cloneOfA[this.props.index].answers[0].value=this.props.answerSelected[this.props.index].answers[0].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[1]._id);
                    this.props.next(); 
                }}>
                    <Heading>NON</Heading>
                </Button>
            </View>
        );
        }else if(this.props.answerSelected[this.props.index].answers[0].status == 0 && this.props.answerSelected[this.props.index].answers[1].status==1){
        return(
            <View styleName="vertical flexible" style={{flex : 1}}>
                <Button styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[0]={};
                    cloneOfA[this.props.index].answers[0]._id=this.props.answerSelected[this.props.index].answers[0]._id;
                    cloneOfA[this.props.index].answers[0].id_question=this.props.answerSelected[this.props.index].answers[0].id_question;
                    cloneOfA[this.props.index].answers[0].id_survey=this.props.answerSelected[this.props.index].answers[0].id_survey;
                    cloneOfA[this.props.index].answers[0].position=this.props.answerSelected[this.props.index].answers[0].position;
                    cloneOfA[this.props.index].answers[0].status=1;
                    cloneOfA[this.props.index].answers[0].txt=this.props.
                    answerSelected[this.props.index].answers[0].txt;
                    cloneOfA[this.props.index].answers[0].value=this.props.answerSelected[this.props.index].answers[0].value;
                    cloneOfA[this.props.index].answers[1]={};
                    cloneOfA[this.props.index].answers[1]._id=this.props.answerSelected[this.props.index].answers[1]._id;
                    cloneOfA[this.props.index].answers[1].id_question=this.props.answerSelected[this.props.index].answers[1].id_question;
                    cloneOfA[this.props.index].answers[1].id_survey=this.props.answerSelected[this.props.index].answers[1].id_survey;
                    cloneOfA[this.props.index].answers[1].position=this.props.answerSelected[this.props.index].answers[1].position;
                    cloneOfA[this.props.index].answers[1].status=0;
                    cloneOfA[this.props.index].answers[1].txt=this.props.
                    answerSelected[this.props.index].answers[1].txt;
                    cloneOfA[this.props.index].answers[1].value=this.props.answerSelected[this.props.index].answers[1].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[0]._id);
                    this.props.next(); 
                }}>
                    <Heading>OUI</Heading>
                </Button>
                <Divider styleName="line" />
                <Button style={{backgroundColor:'#ABABAB'}} styleName="full-width" onPress={() =>  {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[1]={};
                    cloneOfA[this.props.index].answers[1]._id=this.props.answerSelected[this.props.index].answers[1]._id;
                    cloneOfA[this.props.index].answers[1].id_question=this.props.answerSelected[this.props.index].answers[1].id_question;
                    cloneOfA[this.props.index].answers[1].id_survey=this.props.answerSelected[this.props.index].answers[1].id_survey;
                    cloneOfA[this.props.index].answers[1].position=this.props.answerSelected[this.props.index].answers[1].position;
                    cloneOfA[this.props.index].answers[1].status=0;
                    cloneOfA[this.props.index].answers[1].txt=this.props.
                    answerSelected[this.props.index].answers[1].txt;
                    cloneOfA[this.props.index].answers[1].value=this.props.answerSelected[this.props.index].answers[1].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, this.props.reponses[1]._id);
                    this.props.next(); 
                }}>
                    <Heading>NON</Heading>
                </Button>
            </View>
        );
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
      answerSelected : state.sondageReducer.answer,
    }
  }

export default connect(mapStateToProps)(ReponseOuiNon);