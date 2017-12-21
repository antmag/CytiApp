import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

// import { Card } from 'react-native-material-design';


export default class SondagePreview extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            description : this.props.description,
            image : this.props.image,
            duree : this.props.duree
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.image}} style={styles.imagePreview} />
                <View style={{flex:3}}>
                    <Text style={styles.previewTitle}>{this.state.title}</Text>
                    <Text>{this.state.description}</Text>
                    <Text>{this.state.duree}</Text>
                </View>
            </View>
            // <View>
            //     <Card>
            //         <Card.Media
            //             image={<Image source={{uri: this.state.image}} />}
            //         />
            //         <Card.Body>
            //             <Text>{this.state.title}</Text>
            //         </Card.Body>
            //     </Card>    
            // </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        margin: 5,
        borderWidth: 0.5,
        borderColor: "black",
        backgroundColor: 'white'
    },
    imagePreview: {
        flex : 1,
    },
    previewTitle:{
        fontSize: 20,
        fontWeight: 'bold'
    }
  });