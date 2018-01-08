import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image, TouchableOpacity } from '@shoutem/ui';

class ReducPreview extends Component {
 
  constructor(props){
    super(props);
  }

  onPress = () => {
    console.log("pressed");
    this.popupDialog.show();
  }

  render() {
    
    return (
        <TouchableOpacity onPress={this.onPress}>
          <View style={{marginRight:50 }}>
            <Icon name="trophy" />
          </View>
        </TouchableOpacity>
    );
  }
}


  export default connect()(ReducPreview);