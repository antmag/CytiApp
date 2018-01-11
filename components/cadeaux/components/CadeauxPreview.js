import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Title, Button, Text, Image, TouchableOpacity } from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconBadge from 'react-native-icon-badge';

class CadeauxPreview extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
    
    return (
/*          <TouchableOpacity
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'PhysiqueCadeaux'});
                    this.props.navigation.dispatch(navigate);
                }}
          >
          <View style={{marginLeft:50 }}>
            <IconBadge
              MainElement={
                <Icon name="present" size={60}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>4</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                backgroundColor: '#FF0000'}
              }
            />
          </View>
        </TouchableOpacity>*/

          <TouchableOpacity
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'PhysiqueCadeaux'});
                    this.props.navigation.dispatch(navigate);
                }}
          >
          <View style={{}}>
            <IconBadge
              MainElement={
                <Icon name="present" size={80}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{this.props.countCadeaux}</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                backgroundColor: '#FF0000'}
              }
            />
          </View>
        </TouchableOpacity>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return{
      navigation : state.navigationReducer.navigator,
    }
  }

export default connect(mapStateToProps)(CadeauxPreview);