import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import MyButton from './MyButton';
import { Switch } from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.v1}>
        <Image style={styles.img} source={require('./img.png')}></Image>
        </View>
        <View style={styles.v2}>
            <View style={styles.v3}>
                <Text style={styles.text1}> {this.props.timestamp} </Text>
            </View>
            <View style={styles.v3}>
                <Text style={styles.text2}> {this.props.latitude} </Text>
                <Text style={styles.text2}> {this.props.longitude} </Text>
            </View>
        </View>
        {this.props.switch}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#636363",
        width: '90%',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    img: {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    text1: {
        color: "#47ffcc",
        fontWeight: 'bold',
        fontSize: 15
    },
    text2: {
        color: "#47ffcc",
        fontWeight: 'bold',
        fontSize: 9
    },
    v1: {

        flexDirection: 'row',
    },
    v2: {
        flex : 1,
        flexDirection: 'column'
    },
    v3: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        flexDirection: 'row'
    }
})