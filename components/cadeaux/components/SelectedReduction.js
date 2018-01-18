import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Screen, NavigationBar, Caption, View, ListView, Heading,Button, Icon, Title, Tile, Subtitle, Text, Image , TouchableOpacity} from '@shoutem/ui';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {setConnectedUser, updateAvailablesReductions, updateAvailablesCadeaux, updateCounterReductions, updateCounterCadeaux } from '../../../actions'
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class SelectedReduction extends Component {
    
    constructor(props){
        super(props);
        this.removePoints=this.removePoints.bind(this);

    }

    removePoints(points){

      var cloneOfA = JSON.parse(JSON.stringify(this.props.userData));
      var newPoints = Number(this.props.userData[0].points) - Number(points);
      cloneOfA[0]={};
      cloneOfA[0]._id=this.props.userData[0]._id;
      cloneOfA[0].id_facebook=this.props.userData[0].id_facebook;
      cloneOfA[0].username=this.props.userData[0].username;
      cloneOfA[0].login=this.props.userData[0].login;
      cloneOfA[0].mdp=this.props.userData[0].mdp;
      cloneOfA[0].owner=this.props.userData[0].owner;
      cloneOfA[0].points=newPoints;
      cloneOfA[0].url_fb_picture=this.props.userData[0].url_fb_picture;
      cloneOfA[0].surveys=this.props.userData[0].surveys;
      console.log(cloneOfA);
      console.log(this.props.userData[0]);
      this.props.dispatch(setConnectedUser(cloneOfA));
      return fetch('http://195.154.107.158:1337/profil/removePoints/page?id='+this.props.userData[0]._id+"&points="+newPoints)
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
              this.props.dispatch(updateCounterReductions({
                  counterReductions: countReductions,
              }));
              this.props.dispatch(updateCounterCadeaux({
                  counterCadeaux: countCadeaux,
              }));

            })
            .catch((error) => {
              console.error(error);
            });
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
                                this.removePoints(this.props.selectedReduction.points);
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
        selectedReduction: state.reductionReducer.reduction,
        userData : state.profilReducer.connected,
    }
}

export default connect(mapStateToProps)(SelectedReduction);