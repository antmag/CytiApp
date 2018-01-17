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

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      isLoading: true,
      refresh: true,
      sondages : [
        // {
        // "id_survey": 0,
        // title:'Les vernis à ongles',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Mode",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 1,
        // title:'Les marques de prêt à porter',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Sport",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 2,
        // title:'Les desserts',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Sport",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 3,
        // title: 'Les courses de Noël',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Shopping",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 4,
        // title: 'Un super Sondage',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Mode",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 5,
        // title:'Encore un autre',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Sport",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
        // {
        // "id_survey": 6,
        // title: 'Un sondage sur pleins de questions',
        // image: "../../../assets/images/survey.jpg",
        // theme: "Sport",
        // description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        // },
      ]
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
    fetch('http://195.154.107.158:1337/app')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        refresh: !this.state.refresh,
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
            ref = {(list) => this.list = list}
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

