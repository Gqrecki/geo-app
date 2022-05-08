import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const markers = this.props.route.params.maps.filter(map => map.picked)
    return (
        <View style={styles.v1}>
        <View style={styles.v2}>
        <MapView  style={styles.v3}>
        {markers.map(marker => (
            <MapView.Marker
                coordinate={{latitude: marker.latitude, longitude: marker.longitude,}}
                title={marker.timestamp + ''}
                key={marker.timestamp + ''}
            />))}
        </MapView>

        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    v1: {
        flex: 1,
        backgroundColor: "#636363",
    },
    v2: {
        flex: 2,
        backgroundColor: "#47ffcc",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    v3: {
        flex:1,
        borderRadius: 20
    }
})


