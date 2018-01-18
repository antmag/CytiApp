import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar, Caption, View, Heading, Icon, Title, Image, Text, Divider } from '@shoutem/ui';
import CompletedSurveys from './components/CompletedSurveys';
import { PieChart, StackedBarChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'
import {updateCompletedSurveys} from '../../actions';

class Profil extends Component {
 
  constructor(props){
    super(props);
    this.getAllThemes=this.getAllThemes.bind(this);
    this.changeSizeText=this.changeSizeText.bind(this);

  }

  getAllThemes(data, themes, colors){
    let array_render=[];
    var maMap=data;
    var theme=themes;
    var color=colors;
    Object.keys(data).forEach(function(k, v){
        array_render.push(
            <Text style={{color: color[k]}} key={theme[k]}>{theme[k]} : {maMap[k]} sondages complétés</Text>
        );
    });
    return array_render;
  }

  changeSizeText(data,themes,colors){
    let array_render=[];
    var maMap=data;
    var theme=themes;
    var color=colors;
    Object.keys(data).forEach(function(k, v){
        console.log(maMap[k]);
        array_render.push(
            <Text key={theme[k]}>{theme[k]} : {maMap[k]} sondages complétés</Text>
        );
    });
    return array_render;
 }

componentDidMount() {
    return fetch('http://192.168.1.24:1337/profil/surveys/page?id_user='+this.props.userData[0]._id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
        });
        console.log(responseJson.beauty);
        this.props.dispatch(updateCompletedSurveys({
            completedSurveys: responseJson.surveys,
            totalCompletedSurveys: responseJson.total,
            modeCompletedSurveys: responseJson.mode,
            shoppingCompletedSurveys: responseJson.shopping,
            sportCompletedSurveys: responseJson.sport,
            beautyCompletedSurveys: responseJson.beauty,

        }));

      })
      .catch((error) => {
        console.error(error);
      });
}

  render() {
        console.log(this.props.completedSurveysReducer.totalCompletedSurveys);
        const data = [ 
                        this.props.completedSurveysReducer.beautyCompletedSurveys,
                        this.props.completedSurveysReducer.sportCompletedSurveys,
                        this.props.completedSurveysReducer.shoppingCompletedSurveys,
                        this.props.completedSurveysReducer.modeCompletedSurveys,
                    ];

        const index = ["beauty", "sport" , "shopping" , "mode"];
        const colors = ["#262e45", "#ff9800" , "#7db9b3" , "#f2bcfb"];
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
        const pieData = data
            .map((value, index) => ({
                value,
                color: colors[index],
                key: `pie-${index}`,
                onPress: () => {},
            }));

        const display_caption= this.getAllThemes(data,index,colors);

    return (

	   	<View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
   			<Title style={{alignItems: 'center'}}>Tes Stats</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                colors={ colors }
            />
	      		</View>
	      		<View style={{ flex: 1 }}>
            {display_caption}
	   			  </View>
      		</View>
  			<Title style={{alignItems: 'center'}}>Tes Badges</Title>
	    	<View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
	      		<View style={{ flex: 1}}>
              <CompletedSurveys totalCompletedSurveys={this.props.completedSurveysReducer.completedSurveys}/>
	      		</View>
	      		<View style={{ flex: 1 }}>
	        		<Text>Development Progress</Text>
	   			</View>
      		</View>
	    </View>  
    );
  }
}

  const mapStateToProps = (state, ownProps) => {
    return{
      userData : state.profilReducer.connected,
      completedSurveysReducer : state.profilReducer.completedSurveys,
    }
  }

  export default connect(mapStateToProps)(Profil);