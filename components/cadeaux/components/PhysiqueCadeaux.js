import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Screen, NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image } from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';

class PhysiqueCadeaux extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
    
    return (
            <Screen>
                <NavigationBar
                    styleName="inline"
                    hasHistory
                    centerComponent={
                        <Title styleName="bold h-center" numberOfLines={1}>
                            Availables presents
                        </Title>
                    }
                    navigateBack={ () => {
                        const navigateBack = NavigationActions.back()
                        this.props.navigation.dispatch(navigateBack);
                    }}
                />
                <Text>TEST</Text>
            </Screen>  
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return{
        navigation : state.navigationReducer.navigator,
    }
}

export default connect(mapStateToProps)(PhysiqueCadeaux);