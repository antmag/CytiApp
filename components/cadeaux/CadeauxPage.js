import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';
import CadeauxPreview from './components/CadeauxPreview';
import ReducPreview from './components/ReducPreview';

class CadeauxPage extends Component {
 
  constructor(props){
    super(props);
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
                styleName="small-avatar"
                source={{ uri: this.props.userData.profile.picture.data.url}}
              />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>165 Points</Text>
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