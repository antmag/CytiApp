import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';

class CadeauxPreview extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
    
    return (
          <View style={{marginLeft:50 }}>
            <Icon name="gift" />
          </View>
    );
  }
}


  export default connect()(CadeauxPreview);