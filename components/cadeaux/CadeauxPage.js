import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Tile, Title, Subtitle, Overlay } from '@shoutem/ui';
import CadeauxPreview from './components/CadeauxPreview';
import ReducPreview from './components/ReducPreview';
import * as contentMapTmp from './components/sondages.json';
import {updateAvailablesReductions, updateCounterReductions, updateCounterCadeaux, updateAvailablesCadeaux} from '../../actions';


class CadeauxPage extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      contentMap:contentMapTmp,
    }
  }



  componentDidMount() {
  
  return fetch('http://195.154.107.158:1337/cadeaux?points='+this.props.userData[0].points)
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
        
        console.log(typeof myJSONReductions);
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


  render() {

    return (
      <View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{ flex: 2}}>
          <CadeauxPreview countCadeaux={this.props.cadeauxReducer.counterCadeaux}/>
        </View>
        <View style={{ flex: 2}}>
          <ReducPreview countReductions={this.props.reductionReducer.counterReductions}/>
        </View>
        <Tile styleName="text-centric">
          <Title styleName="md-gutter-bottom">PROGRESSION ACTUELLE</Title>
          <Overlay styleName="solid-dark">
            <Subtitle styleName="sm-gutter-horizontal">{this.props.userData[0].points} points</Subtitle>
          </Overlay>
        </Tile>
      </View>
      
    );
  }
}

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
      reductionReducer : state.reductionReducer.counterReductions,
      cadeauxReducer : state.cadeauReducer.counterCadeaux,

    }
  }

  export default connect(mapStateToProps)(CadeauxPage);