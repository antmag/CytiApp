import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { View, Text, Tile, Title, Subtitle, Overlay, Divider, Caption, TouchableOpacity } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  
  return fetch('http://cyti.club/cadeaux?points='+this.props.userData[0].points)
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
  }


  render() {

    return (
      <View style={{flex:1}}>

        <View >

          <TouchableOpacity
            onPress={() => {
              const navigate = NavigationActions.navigate({routeName:'PhysiqueCadeaux'});
              this.props.navigation.dispatch(navigate);
            }}
          >
            <View styleName="horizontal h-center v-center" style={{paddingLeft:10}}>
              <Icon name="gift" size={90} color='rgba(0, 0, 0, 0.7)'/>
              <Tile styleName="text-centric">
                <Title styleName="md-gutter-bottom">Echangez vos points contre des cadeaux</Title>
                <Caption>{this.props.cadeauxReducer.counterCadeaux} cadeaux actuellement disponibles</Caption>
              </Tile>
            </View>
          </TouchableOpacity>

          <Divider styleName="line small center" />

          <TouchableOpacity
            onPress={() => {
              const navigate = NavigationActions.navigate({routeName:'ReductionCadeaux'});
              this.props.navigation.dispatch(navigate);
            }}
          >
            <View styleName="horizontal h-center v-center" style={{paddingRight:10}}>
              <Tile styleName="text-centric"> 
                <Title styleName="md-gutter-bottom">Profitez de réductions</Title>
                <Caption>{this.props.reductionReducer.counterReductions} réductions actuellement disponibles</Caption>
              </Tile>
              <Icon name="ticket" size={85} color='rgba(0, 0, 0, 0.7)'/>
            </View>  
          </TouchableOpacity>
        </View>

        <Divider styleName="line small center" style={{marginTop:10}} />
        
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
      navigation : state.navigationReducer.navigator,
      userData : state.profilReducer.connected,
      reductionReducer : state.reductionReducer.counterReductions,
      cadeauxReducer : state.cadeauReducer.counterCadeaux,

    }
  }

  export default connect(mapStateToProps)(CadeauxPage);