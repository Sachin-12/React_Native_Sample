// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import LogoutScreen from './components/LogoutScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const activeTintLabelColor = '#FF0000';
const inactiveTintLabelColor = '#808080';

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    
  },
  Map: {
    screen: MapScreen
  },
  Logout: {
    screen: LogoutScreen
  }},{
  tabBarOptions: {
    labelStyle: {
      fontSize: 25,
      margin: 0,
      padding: 0,
    },
  }},
  {
    initialRouteName: "Home"

});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});