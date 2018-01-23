import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ListView, View, Button, Text, Icon} from '@shoutem/ui';
import {updateCurrentAnswer} from '../../../../actions';


class ReponseMultiple extends Component {

    constructor(props){
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }


    renderRow(reponse){

        if(reponse.status == 0){
            return(
                <Button style={{backgroundColor:'#FFFFFF'}} styleName="full-width" onPress={() => {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));                    
                    //cloneOfA[this.props.index]={};

                    cloneOfA[this.props.index].answers[reponse.position]={};
                    cloneOfA[this.props.index].answers[reponse.position]._id=this.props.answerSelected[this.props.index].answers[reponse.position]._id;
                    cloneOfA[this.props.index].answers[reponse.position].id_question=this.props.answerSelected[this.props.index].answers[reponse.position].id_question;
                    cloneOfA[this.props.index].answers[reponse.position].id_survey=this.props.answerSelected[this.props.index].answers[reponse.position].id_survey;
                    cloneOfA[this.props.index].answers[reponse.position].position=this.props.answerSelected[this.props.index].answers[reponse.position].position;
                    cloneOfA[this.props.index].answers[reponse.position].status=1;
                    cloneOfA[this.props.index].answers[reponse.position].txt=this.props.
                    answerSelected[this.props.index].answers[reponse.position].txt;
                    cloneOfA[this.props.index].answers[reponse.position].value=this.props.answerSelected[this.props.index].answers[reponse.position].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, reponse._id);
                }}>
                    <Text>{reponse.txt}</Text>
                </Button>    
            );
        }else if(reponse.status == 1){
            return(
                <Button style={{backgroundColor:'#ABABAB'}} styleName="full-width" onPress={() => {
                    var cloneOfA = JSON.parse(JSON.stringify(this.props.answerSelected));
                    cloneOfA[this.props.index].answers[reponse.position]={};
                    cloneOfA[this.props.index].answers[reponse.position]._id=this.props.answerSelected[this.props.index].answers[reponse.position]._id;
                    cloneOfA[this.props.index].answers[reponse.position].id_question=this.props.answerSelected[this.props.index].answers[reponse.position].id_question;
                    cloneOfA[this.props.index].answers[reponse.position].id_survey=this.props.answerSelected[this.props.index].answers[reponse.position].id_survey;
                    cloneOfA[this.props.index].answers[reponse.position].position=this.props.answerSelected[this.props.index].answers[reponse.position].position;
                    cloneOfA[this.props.index].answers[reponse.position].status=0;
                    cloneOfA[this.props.index].answers[reponse.position].txt=this.props.
                    answerSelected[this.props.index].answers[reponse.position].txt;
                    cloneOfA[this.props.index].answers[reponse.position].value=this.props.answerSelected[this.props.index].answers[reponse.position].value;
                    this.props.dispatch(updateCurrentAnswer(cloneOfA));
                    this.props.addAnswer(this.props.id, reponse._id);
                }}>
                    <Text>{reponse.txt}</Text>
                </Button>    
            );
        }

    }

    render(){

        return (
            <View style={{flex:1}}>
                <View style={{flex:6, paddingBottom:5}}>
                    <ListView
                        data={this.props.answerSelected[this.props.index].answers}
                        renderRow={this.renderRow}
                    />
                </View>
                <Button styleName="full-width secondary" onPress={() =>  {
                    this.props.sendAnswer(this.props.id);
                    this.props.next(); 
                }}>
                    <Text>Suivant</Text>
                    <Icon name="right-arrow" />
                </Button>
            </View>    
        );
    }
}

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
      answerSelected : state.sondageReducer.answer,
    }
  }

export default connect(mapStateToProps)(ReponseMultiple);