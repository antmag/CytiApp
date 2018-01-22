import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ListView, View, Button, Text, Icon} from '@shoutem/ui';
import {updateCurrentAnswer} from '../../../../actions';


class ReponseUnique extends Component {

    constructor(props){
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.disableOthers = this.disableOthers.bind(this);
    }

    disableOthers(id, index, data){

    var cloneOfA = JSON.parse(JSON.stringify(data));                    

        Object.keys(data[this.props.index].answers).forEach(function(k, v){
            console.log(cloneOfA[index].answers[k]);
            if(cloneOfA[index].answers[k]._id==id){
                cloneOfA[index].answers[k]={};
                cloneOfA[index].answers[k]._id=data[index].answers[k]._id;
                cloneOfA[index].answers[k].id_question=data[index].answers[k].id_question;
                cloneOfA[index].answers[k].id_survey=data[index].answers[k].id_survey;
                cloneOfA[index].answers[k].position=data[index].answers[k].position;
                cloneOfA[index].answers[k].status=1;
                cloneOfA[index].answers[k].txt=data[index].answers[k].txt;
                cloneOfA[index].answers[k].value=data[index].answers[k].value;
            }else{
                cloneOfA[index].answers[k]={};
                cloneOfA[index].answers[k]._id=data[index].answers[k]._id;
                cloneOfA[index].answers[k].id_question=data[index].answers[k].id_question;
                cloneOfA[index].answers[k].id_survey=data[index].answers[k].id_survey;
                cloneOfA[index].answers[k].position=data[index].answers[k].position;
                cloneOfA[index].answers[k].status=0;
                cloneOfA[index].answers[k].txt=data[index].answers[k].txt;
                cloneOfA[index].answers[k].value=data[index].answers[k].value;
            }

        });

        this.props.dispatch(updateCurrentAnswer(cloneOfA));
    }

    renderRow(reponse){
        if(reponse.status == 0){
            return(
                <Button style={{backgroundColor:'#FFFFFF'}} styleName="full-width" onPress={() => {
                    this.disableOthers(reponse._id, this.props.index, this.props.answerSelected);
                    this.props.addAnswer(this.props.id, reponse._id);
                    this.props.next();
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
                    //this.props.addAnswer(this.props.id, reponse._id, this.props.index);
                    
                }}>
                    <Text>{reponse.txt}</Text>
                </Button>   
            );
        }
    }

    render(){

        //console.log(this.props.reponses);
        return (
            <View style={{flex:1}} styleName="v-center">
                <ListView
                    data={this.props.answerSelected[this.props.index].answers}
                    renderRow={this.renderRow}
                />
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

export default connect(mapStateToProps)(ReponseUnique);