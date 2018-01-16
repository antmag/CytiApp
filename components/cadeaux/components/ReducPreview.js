import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavigationBar, Caption, View, Heading, Title, Button, Text, Image, TouchableOpacity } from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';

class ReducPreview extends Component {
 
  constructor(props){
    super(props);
  }


  onPress = () => {
    console.log("pressed");
  }

  render() {

    return (
/*          <TouchableOpacity
                onPress={() => {
                    const navigate = NavigationActions.navigate({routeName:'ReductionCadeaux'});
                    this.props.navigation.dispatch(navigate);
                }}
          >
          <View style={{marginRight:50 }}>
            <IconBadge
              MainElement={
                <Icon name="ticket" size={60}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>2</Text>
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
                    const navigate = NavigationActions.navigate({routeName:'ReductionCadeaux'});
                    this.props.navigation.dispatch(navigate);
                }}
          >


          <View style={{justifyContent: 'center'}}>
            <IconBadge
              MainElement={
                <Icon name="ticket" size={80}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{this.props.countReductions}</Text>
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

export default connect(mapStateToProps)(ReducPreview);