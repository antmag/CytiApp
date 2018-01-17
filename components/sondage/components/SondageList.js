import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ListView, View, Text, Spinner } from '@shoutem/ui';
import Animation from 'lottie-react-native';

import SondagePreview from './SondagePreview';

import anim from '../../../assets/animations/loader.json';

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
    
    fetch('http://195.154.107.158:1337/app')
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
          />
      </View>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return{
    filter : state.filterReducer.selectedFilter,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default connect(mapStateToProps)(SondageList);

