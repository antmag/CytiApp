import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';
import CadeauxPreview from './components/CadeauxPreview';
import ReducPreview from './components/ReducPreview';
import * as contentMapTmp from './components/sondages.json';
import {updateAvailablesCadeaux} from '../../actions';

class CadeauxPage extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      contentMap:contentMapTmp,
    }
    this.props.dispatch(updateAvailablesCadeaux({
        listCadeaux: this.state.contentMap,
    }));
  }

  render() {

    return (
      <View style={{ flex: 1}}>
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