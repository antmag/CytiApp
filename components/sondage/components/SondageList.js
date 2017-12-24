import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListView } from '@shoutem/ui';
import Animation from 'lottie-react-native';

import SondagePreview from './SondagePreview';

import anim from '../../../assets/animations/soda_loader.json';

class SondageList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);

    //TODO: Récuperer la vraie liste des sondages par appel au serveur
    this.state = {
      sondages : [
        {key: 'Les vernis à ongles',
        image: "../../../assets/images/survey.jpg",
        theme: "Mode",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Les marques de prêt à porter',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Les desserts',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Les courses de Noël',
        image: "../../../assets/images/survey.jpg",
        theme: "Shopping",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Un super Sondage',
        image: "../../../assets/images/survey.jpg",
        theme: "Mode",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Encore un autre',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
        {key: 'Un sondage sur pleins de questions',
        image: "../../../assets/images/survey.jpg",
        theme: "Sport",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dapibus eros. Phasellus gravida fringilla diam, congue suscipit sapien. Etiam lobortis facilisis erat tempor ullamcorper. Vestibulum non magna dolor."
        },
      ]
    }

  }

  launchAnimation(){
    this.animation.play(30,120);
  }

  renderRow(sondage){
    return(
      <SondagePreview 
        title={sondage.key}
        image={sondage.image}
        description={sondage.description}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <ListView
            data={(this.props.filter && !(this.props.filter.theme == "All")) ? this.state.sondages.filter(sondage => sondage.theme == this.props.filter) : thid.state.sondages}
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

