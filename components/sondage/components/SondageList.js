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

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      isLoading: true,
      sondages : [
        {
        title:'Les vernis à ongles',
        image: "../../../assets/images/survey.jpg",
        theme: "Mode",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title:'Les marques de prêt à porter',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title:'Les desserts',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title: 'Les courses de Noël',
        image: "../../../assets/images/survey.jpg",
        theme: "Shopping",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title: 'Un super Sondage',
        image: "../../../assets/images/survey.jpg",
        theme: "Mode",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title:'Encore un autre',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {
        title: 'Un sondage sur pleins de questions',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
      ]
    }

  }

  renderRow(sondage){
    return(
      <SondagePreview 
        title={sondage.title}
        image={sondage.image}
        description={sondage.description}
      />
    );
  }

  componentDidMount() {

    //Play the loader animation
    this.animation.play();

    //TODO: Replace adress with the serveur
    return fetch('https://facebook.github.io/react-native/movies.json')
    // return fetch('192.168.1.101:1337/app')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          //TODO: Décommenter la ligne
          // sondages: responseJson,
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
            renderRow={this.renderRow}
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

