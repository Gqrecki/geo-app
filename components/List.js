import { startGeofencingAsync } from 'expo-location';
import * as Location from "expo-location";
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import MyButton from './MyButton';
import { AsyncStorage } from 'react-native';
import ListItem from './ListItem';
import { Switch } from 'react-native';
import { ActivityIndicator } from 'react-native';


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      allPicked: false,
      position: false,
    };
  }

  componentDidMount(){
    this.setPermissions()
    try {
      this.getalldata()
    }catch{}
  }

  setPermissions = async () => {
    let { status } = await  Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Przykro mi :(')
    }
  }

  addposition = async () => {
    console.log("lokalizacja")
    this.setState({
      position: true
    })
    let pos = await Location.getCurrentPositionAsync({})
    // let xd = JSON.stringify(pos, null, 4)
    let obj = {timestamp:pos.timestamp, latitude:pos.coords.latitude, longitude:pos.coords.longitude, picked:false}
    await this.setdata(obj)
  }

  setdata = async (obj) => {
    console.log("zapis")
    let timestamp = String(obj.timestamp)
    await AsyncStorage.setItem(timestamp, JSON.stringify(obj))
    await this.getalldata()
  }

  getalldata = async () => {
    console.log("wczytano dane")
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    const maps = stores.map((result, index, store) => JSON.parse(store[index][1]))
    this.setState({maps})
    this.setState({
      position: false
    })
  }

  deleteall = async () => {
    try {
      await AsyncStorage.clear()
      this.setState({maps: []})
    }catch{}
  }

  lookmap = async() => {
    let how = this.state.maps.filter(map => map.picked)
    if(how.length > 0){
      this.props.navigation.navigate("Map", {maps: this.state.maps})
    }else{
      alert("No choice")
    }
  }

  setpicked = (timestamp) => {
    const maps = this.state.maps.map(map => {
      if(map.timestamp === timestamp){
          map.picked = !map.picked
      }
      return map
      })
      this.setState({maps})
  }

  setPickAll = () => {
    const allPicked = !this.state.allPicked
    const maps = this.state.maps.map(map => {
        map.picked = allPicked
        return map
    })
    this.setState({maps, allPicked})
  }

  render() {
    return (
        <View style={styles.con}>
          {
          this.state.position
          ?
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#636363" />
          </View>
          :
          <View style={{flex:1}}>
            <View style={styles.container}>
            <FlatList
                  style={styles.flat}
                  data = {this.state.maps}
                  renderItem={({ item }) => 
                  <ListItem 
                  timestamp={item.timestamp}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  switch= {<Switch style={styles.switch}
                    trackColor={{ false: "#636363", true: "#47ffcc" }}
                    thumbColor={"#636363"}
                    value={item.picked}
                    ios_backgroundColor="#47ffcc"
                    onValueChange={ () => this.setpicked(item.timestamp)}
                  />}
                  >
                  </ListItem>}
                  keyExtractor={(item, index) => index.toString()}/>
            </View>
            <View style={styles.container2}>
              <View style={{flex:1, flexDirection: 'row'}}>
              <View style={styles.container3}>
                  <MyButton 
                    style={styles.bt}
                    textstyle={styles.bttext}
                    text="Add Position" 
                    func={() => {
                        this.addposition()
                    }}
                  >
                </MyButton>
                </View>
                <View style={styles.container3}>
                  <MyButton 
                    style={styles.bt}
                    textstyle={styles.bttext}
                    text="Delete All" 
                    func={() => {
                        this.deleteall()
                    }}
                  >
                  </MyButton>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
              <View style={styles.container3}>
                <View style={styles.btlol}>
                <Switch
                    trackColor={{ false: "#47ffcc", true: "#636363" }}
                    thumbColor={"#47ffcc"}
                    ios_backgroundColor="#636363"
                    value={this.state.allPicked}
                    onValueChange={this.setPickAll}
                  />
                </View>
                </View>
                <View style={styles.container3}>
                  <MyButton 
                      style={styles.bt}
                      textstyle={styles.bttext}
                      text="Look Map" 
                      func={() => {
                          this.lookmap()
                      }}
                    >
                    </MyButton>
                </View>
              </View>
            </View>
          </View>
          
          }
            {/* <View style={styles.container}>
            <FlatList
                  style={styles.flat}
                  data = {this.state.maps}
                  renderItem={({ item }) => 
                  <ListItem 
                  timestamp={item.timestamp}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  switch= {<Switch style={styles.switch}
                    trackColor={{ false: "#636363", true: "#47ffcc" }}
                    thumbColor={"#636363"}
                    value={item.picked}
                    ios_backgroundColor="#47ffcc"
                    onValueChange={ () => this.setpicked(item.timestamp)}
                  />}
                  >
                  </ListItem>}
                  keyExtractor={(item, index) => index.toString()}/>
            </View>
            <View style={styles.container2}>
              <View style={{flex:1, flexDirection: 'row'}}>
              <View style={styles.container3}>
                  <MyButton 
                    style={styles.bt}
                    textstyle={styles.bttext}
                    text="Add Position" 
                    func={() => {
                        this.addposition()
                    }}
                  >
                </MyButton>
                </View>
                <View style={styles.container3}>
                  <MyButton 
                    style={styles.bt}
                    textstyle={styles.bttext}
                    text="Delete All" 
                    func={() => {
                        this.deleteall()
                    }}
                  >
                  </MyButton>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
              <View style={styles.container3}>
                <View style={styles.btlol}>
                <Switch
                    trackColor={{ false: "#47ffcc", true: "#636363" }}
                    thumbColor={"#47ffcc"}
                    ios_backgroundColor="#636363"
                    value={this.state.allPicked}
                    onValueChange={this.setPickAll}
                  />
                </View>
                </View>
                <View style={styles.container3}>
                  <MyButton 
                      style={styles.bt}
                      textstyle={styles.bttext}
                      text="Look Map" 
                      func={() => {
                          this.lookmap()
                      }}
                    >
                    </MyButton>
                </View>
              </View>
            </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    btlol: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    switch: {
      margin: 5
    },
    flat: {
      marginTop: '3%',
      width: "100%",
      marginLeft: '5%',
    },
    con: {
        flex: 1,
        backgroundColor: '#636363'
    },
    container: {
      flex: 4,
      flexDirection: 'column',
      backgroundColor: '#47ffcc',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      alignItems: 'center',
      alignContent: 'center',
    },
    container2: {
      flex: 1,
      backgroundColor: '#47ffcc',
    },
    container3: {
      flex: 1,
      alignItems: 'center',
      alignContent: 'center',
    },
    bt: {
      margin: '4%',
      width: '80%',
      padding: 10,
      backgroundColor: "#636363",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
  },
  bttext: {
      fontSize: 20,
      color: "#47ffcc",
      fontWeight: 'bold',
  },
    // flat: {
    //   width: "100%",
    //   marginLeft: '5%',
    //   marginTop: '3%'
    // }
 })
