import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { ListView, View, GridRow, TouchableOpacity, Card, Image, Subtitle, Caption } from '@shoutem/ui';
import Animation from 'lottie-react-native';

import SondageFeatured from './SondageFeatured';
import SondageCard from './SondageCard';

import anim from '../../../assets/animations/loader.json';
import {updateListSondage} from '../../../actions';



const { height, width } = Dimensions.get('window');

class SondageList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.refreshSurveyList = this.refreshSurveyList.bind(this);

    this.state = {
      isLoading: true,
      refresh: true    }

  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    if (index === '0') {
      return (
        <SondageFeatured
          key={rowData[0]._id}
         id={rowData[0]._id}
         title={rowData[0].title}
         image={rowData[0].picture_url}
         description={rowData[0].description}
         points={rowData[0].points}
       />
      );
    }

    const cellViews = rowData.map((sondage, id) => {
    return (
        <SondageCard
        key={sondage._id}
          idRow={id}
          id={sondage._id}
          title={sondage.title}
          image={sondage.image}
          description={sondage.description}
          points={rowData[0].points}
        />
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
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
      });
      this.props.dispatch(updateListSondage(responseJson));

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

    if(this.props.filter && (this.props.filter !== "All")){
      var filteredSondage = this.props.listSondages.filter(sondage => sondage.theme == this.props.filter);
    }
    else{
      var filteredSondage = this.props.listSondages;
    }

    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(filteredSondage, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }
      return 1;
    });
    
    return (
      <View>
          <ListView
            //data={(this.props.filter && (this.props.filter !== "All")) ? this.state.sondages.filter(sondage => sondage.theme == this.props.filter) : this.state.sondages}
            data = {groupedData}
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
    user: state.profilReducer.connected,
    listSondages : state.sondageReducer.listSondage,
  }
}

export default connect(mapStateToProps)(SondageList);

