import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Button, Text, Image, Divider } from '@shoutem/ui';

class Profil extends Component {
 
  constructor(props){
    super(props);
  }

  render() {

    return (

	   	<View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
   			<Title style={{alignItems: 'center'}}>Tes Stats</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
		      		<Image
                      styleName="large-banner"
                      source={{ uri: 'http://lecompagnon.info/img2010/excel2010-graphique2.gif' }}
                    >
                    </Image>
	      		</View>
	      		<View style={{ flex: 1 }}>
	        		<Text>BONJOUR</Text>
	   			</View>
      		</View>
  			<Title style={{alignItems: 'center'}}>Tes Badges</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
		      		<Image
                      styleName="large-banner"
                      source={{ uri: 'http://lecompagnon.info/img2010/excel2010-graphique2.gif' }}
                    >
                    </Image>
	      		</View>
	      		<View style={{ flex: 1 }}>
	        		<Text>BONJOUR</Text>
	   			</View>
      		</View>
	    </View>  
    );
  }
}

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
    }
  }

  export default connect(mapStateToProps)(Profil);