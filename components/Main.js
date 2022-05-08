import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
        'myfont': require('./font.ttf'),
    });
    this.setState({ fontloaded: true })
}

  render() {
    return (
      <View style={styles.v}>

        {
          this.state.fontloaded
          ?
          <View style={styles.v1}>
              <Text style={styles.vtext}>Geo-App</Text>
          </View>
          :
          <View style={styles.v1}>
          <ActivityIndicator size="large" color="#636363" />
          </View>
          }

        <View style={styles.v2}>
          <MyButton 
                  style={styles.bt}
                  textstyle={styles.bttext}
                  text="Start" 
                  func={() => {
                      this.props.navigation.navigate("List")
                  }}
              >
            </MyButton>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    v: {
        flex: 1,
        backgroundColor: "#47ffcc",
    },
    vtext: {
        fontSize: 50,
        color: "#636363",
        fontFamily: 'myfont'
    },
    v1: {
        flex: 1,
        backgroundColor: "#47ffcc",
        justifyContent: 'center',
        alignItems: 'center'
    },
    v2: {
        flex: 2,
        backgroundColor: "#636363",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bt: {
        margin: '4%',
        width: '40%',
        padding: 10,
        backgroundColor: "#47ffcc",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    bttext: {
        fontSize: 20,
        color: "#636363",
        fontWeight: 'bold',
    }
 })
