import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Image, Text, Divider } from '@shoutem/ui';
import CompletedSurveys from './components/CompletedSurveys';
import { PieChart, StackedBarChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

class Profil extends Component {
 
  constructor(props){
    super(props);
  }

  render() {


        const data = [ 50, 10, 40, 95, 85, 91, 35, 53, 24, 50]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
                onPress: () => console.log(`${index} ${value} slice pressed`),
            }))

    return (

	   	<View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
   			<Title style={{alignItems: 'center'}}>Tes Stats</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
            />
	      		</View>
	      		<View style={{ flex: 1 }}>
              <CompletedSurveys/>
	   			</View>
      		</View>
  			<Title style={{alignItems: 'center'}}>Tes Badges</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>

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