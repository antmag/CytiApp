import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Screen, NavigationBar, Caption, View, ListView, Heading,Button, Icon, Title, Tile, Subtitle, Text, Image , TouchableOpacity} from '@shoutem/ui';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
 
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class SelectedReduction extends Component {
    
    constructor(props){
        super(props);
        this.removePoints=this.removePoints.bind(this);

    }

    removePoints(){
        console.log("la");

    }
    render() {

        return (

             <Screen>
                <NavigationBar
                    styleName="inline"
                    hasHistory
                    centerComponent={
                        <Title styleName="bold h-center" numberOfLines={1}>
                            {this.props.selectedReduction.title}
                        </Title>
                    }
                    navigateBack={ () => {
                        const navigateBack = NavigationActions.back()
                        this.props.navigation.dispatch(navigateBack);
                    }}
                />
                <View style={{ flex: 7 }}>
                    <Tile>
                      <Image
                        styleName="large-banner"
                        source={{ uri: this.props.selectedReduction.image }}
                      >
                      </Image>
                      <View styleName="content">
                        <Title>{this.props.selectedReduction.title}</Title>
                        <Subtitle>{this.props.selectedReduction.points} points</Subtitle>
                        <View styleName="horizontal space-between">
                         
                          <Caption>{this.props.selectedReduction.description}</Caption>
                        </View>
                      </View>
                    </Tile>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        styleName="full-width"
                        title="Show Dialog"
                        onPress={() => {
                          this.popupDialog.show();
                        }}
                    >
                        <Text>RECEIVE ON YOUR MAILBOX</Text>
                    </Button>
                </View>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Validation box" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                  >
                    <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center'}}>
                      <Text>You will use {this.props.selectedReduction.points} points for : {this.props.selectedReduction.title}</Text>
                      <Text>Are you sure to order it?</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                      <View styleName="horizontal flexible">
                          <Button styleName="full-width" onPress={() => {
                                this.removePoints();
                            }}
                          >
                            <Text>YES</Text>
                          </Button>
                          <Button styleName="full-width" onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                          >
                            <Text>NO</Text>
                          </Button>
                      </View>
                    </View>
                </PopupDialog>
            </Screen>  
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        navigation : state.navigationReducer.navigator,
        selectedReduction: state.reductionReducer.reduction,
        userData : state.profilReducer.connected,
    }
}

export default connect(mapStateToProps)(SelectedReduction);