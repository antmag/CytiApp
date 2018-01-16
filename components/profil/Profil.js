import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Text, Image, Divider } from '@shoutem/ui';
import CompletedSurveys from './components/CompletedSurveys';
import { PieChart, StackedBarChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

class Profil extends Component {
 
  constructor(props){
    super(props);
  }

  render() {



        const data = [ 50, 10, 40, 95, 85, 91 ]
         const data2 = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
                oranges: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ '#7b4173', '#a55194', '#ce6dbd', '#de9ed6' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
 
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
            }))

    return (

	   	<View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
   			<Title style={{alignItems: 'center'}}>Tes Stats</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
                renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
                    <G key={ index }>
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ item.color }
                        />
                                <Text
            x={ labelCentroid[ 0 ] }
            y={ labelCentroid[ 1 ] }
            stroke="#600"
            fill="#600"
            textAnchor="middle"
        >
            Beauty</Text>
                        <Circle
                            cx={ labelCentroid[ 0 ] }
                            cy={ labelCentroid[ 1 ] }
                            r={ 15 }
                            fill={ item.color }
                        />
                    </G>
                ) }
 
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