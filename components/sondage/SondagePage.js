import React, { Component } from 'react';
import { Text, View, Animated, Button } from 'react-native';
import { DropDownMenu } from '@shoutem/ui';

import Filter from './components/Filter';
import SondageList from './components/SondageList';

export default class SondagePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      filters: [
        { title: 'All', value: 'All' },
        { title: 'Mode', value: 'Mode' },
        { title: 'Sport ', value: 'Sport' },
        { title: 'Shopping', value: 'Shopping' },
      ]
    }
  }

  render() {
    
    return (
        <View style={{ flex: 1 }}>
            <DropDownMenu
              styleName="horizontal"
              options={this.state.filters}
              selectedOption={this.state.selectedFilter ? this.state.selectedFilter : this.state.filters[0]}
              onOptionSelected={(filter) => this.setState({ selectedFilter: filter })}
              titleProperty="title"
              valueProperty="value"
            />
            <View style={{ flex: 6 }}>
              <SondageList />
            </View>  
        </View>
    );
  }
}

