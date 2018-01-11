import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Screen, NavigationBar, Caption, View, ListView, Heading,Button, Icon, Title, Subtitle, Tile, Text, Image , TouchableOpacity} from '@shoutem/ui';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
 
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class SelectedCadeau extends Component {
    
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
                            {this.props.selectedCadeau.title}
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
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-7.png' }}
                      >
                      </Image>
                      <View styleName="content">
                        <Title>{this.props.selectedCadeau.title}</Title>
                        <Subtitle>{this.props.selectedCadeau.points} points</Subtitle>
                        <View styleName="horizontal space-between">
                         
                          <Caption>{this.props.selectedCadeau.description}</Caption>
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
                        <Text>RECEIVE AT HOME</Text>
                    </Button>
                </View>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Validation box" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                  >
                    <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center'}}>
                      <Text>You will use {this.props.selectedCadeau.points} points for : {this.props.selectedCadeau.title}</Text>
                      <Text>Are you sure to order it?</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                      <View styleName="horizontal flexible">
                          <Button styleName="full-width" onPress={() => {
                                this.popupDialog.dismiss();
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
        selectedCadeau: state.cadeauReducer.cadeau,
    
    }
}

export default connect(mapStateToProps)(SelectedCadeau);