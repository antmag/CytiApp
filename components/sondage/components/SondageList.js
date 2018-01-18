import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { ListView, View, Text, Spinner } from '@shoutem/ui';
import Animation from 'lottie-react-native';

import SondagePreview from './SondagePreview';

import anim from '../../../assets/animations/loader.json';

const { height, width } = Dimensions.get('window');

class SondageList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.refreshSurveyList = this.refreshSurveyList.bind(this);

    this.state = {
      isLoading: true,
      refresh: true,
      sondages : []
    }

  }

  renderRow(sondage){
    return(
      <SondagePreview 
        id={sondage._id}
        title={sondage.title}
        image={sondage.image}
        description={sondage.description}
      />
    );
  }

  componentDidMount() {

    //Play the loader animation
    this.animation.play();

    this.refreshSurveyList();
  }

  refreshSurveyList(){
    
    this.setState({isLoading : true});
    
    fetch('http://195.154.107.158:1337/app',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        "id_user" : this.props.user[0]._id
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        sondages: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    
    if(this.state.isLoading){
      return(
        <View styleName="vertical h-center v-center" style={{flex:1}}>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 200,
              height: 200
            }}
            loop={true}
            source={anim}
          />
        </View>  
      );
    }
    
    return (
      <View>
          <ListView
            data={(this.props.filter && (this.props.filter !== "All")) ? this.state.sondages.filter(sondage => sondage.theme == this.props.filter) : this.state.sondages}
            renderRow = { this.renderRow }
            onRefresh = { this.refreshSurveyList }
            style={{
              listContent : { backgroundColor:'transparent', paddingBottom:90}
            }}
          />
      </View>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return{
    filter : state.filterReducer.selectedFilter,
    user: state.profilReducer.connected
  }
}

export default connect(mapStateToProps)(SondageList);

