import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    MyButton.propTypes = {
        text: PropTypes.string.isRequired,
        func: PropTypes.func.isRequired,
        style: PropTypes.string.isRequired,
        textstyle: PropTypes.string.isRequired
    };
  }

  render() {
    return (
      <TouchableOpacity 
      onPress={this.props.func} 
      style={this.props.style}
      >
          <Text 
          style={this.props.textstyle}> {this.props.text} </Text>
      </TouchableOpacity>
    );
    }
}