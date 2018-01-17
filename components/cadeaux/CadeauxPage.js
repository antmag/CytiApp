import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';
import CadeauxPreview from './components/CadeauxPreview';
import ReducPreview from './components/ReducPreview';
import * as contentMapTmp from './components/sondages.json';
import {updateAvailablesCadeaux} from '../../actions';
import {updateAvailablesReductions} from '../../actions';


class CadeauxPage extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      contentMap:contentMapTmp,
      countCadeaux : 0,
      countReductions :0,
    }
  }



  componentDidMount() {
  
  return fetch('http://195.154.107.158:1337/cadeaux?points='+this.props.userData[0].points)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          //TODO: Décommenter la ligne
          // sondages: responseJson,
        });
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
        this.setState({countReductions:countReductions, countCadeaux:countCadeaux});
        this.props.dispatch(updateAvailablesCadeaux({
            listCadeaux: myJSONCadeaux,
        }));
        this.props.dispatch(updateAvailablesReductions({
            listReductions: myJSONReductions,
        }));
      })
      .catch((error) => {
        console.error(error);
      });



  }

  render() {

    return (
/*      <View style={{ flex: 1}}>
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CadeauxPreview/>
          <ReducPreview/>
        </View>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                style={{ height: 80,
                  width: 80,
                  borderRadius: 50,
                  marginBottom: 20}}
                source={{ uri: this.props.userData.profile.picture.data.url}}
              />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: 'orange'}}>
          <Text style={{color: 'white', fontSize: 20}}>165 Points</Text>
        </View>
      </View>*/
      <View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{ flex: 2}}>
          <CadeauxPreview countCadeaux={this.state.countCadeaux}/>
        </View>
        <View style={{ flex: 2}}>
          <ReducPreview countReductions={this.state.countReductions}/>
        </View>
        <View style={{flex: 1, backgroundColor: 'orange'}}>
          <Text style={{color: 'white', fontSize: 20}}>{this.props.userData[0].points} Points</Text>
        </View>
      </View>
      
    );
  }
}

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
    }
  }

  export default connect(mapStateToProps)(CadeauxPage);