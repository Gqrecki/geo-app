import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native"
import List from './components/List';
import Main from './components/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="Main"
               component={Main}
               options={{
                  headerShown: false,
               }} />
            <Stack.Screen 
            name="List" 
            component={List}
            options={{
               headerStyle: {
                  backgroundColor: '#636363',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
               },
               headerTintColor: '#47ffcc',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}  />  
            <Stack.Screen
            name="Map"
            component={Map}
            options={{
               headerStyle: {
                  backgroundColor: '#636363',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
               },
               headerTintColor: '#47ffcc',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}
            />     
         </Stack.Navigator>
      </NavigationContainer>
  );
}
