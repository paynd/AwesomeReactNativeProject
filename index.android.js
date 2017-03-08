/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
} from 'react-native'
import MainPageScene from './src/scenes/MainPageScene'

export default class AwesomeProject extends Component {
  render() {
    const routes = [
      { title: 'Main Scene', index: 0 },
      { title: 'Pick Contact', index: 1 },
      { title: 'List Example', index: 2 },
    ]
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <MainPageScene route={route} navigator={navigator} routes={routes} />
        }
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
