/**
 * Created by paynd on 09.03.17.
 */
import React, { Component } from 'react'
import { StyleSheet, Navigator } from 'react-native'
import ContactPickerScene from './scenes/ContactPickerScene'
import SimpleListScene from './scenes/SimpleListScene'
import MainPageScene from './scenes/MainPageScene'

const routes = [
  { title: 'Main Scene', index: 0 },
  { title: 'Pick Contact', index: 1 },
  { title: 'List Example', index: 2 },
]

export default class Navigation extends Component {

  handlePressedPickContact = (route, navigator) => {
    if (route.index === 0) {
      navigator.push(routes[1])
    }
  }
  handlePressList = (route, navigator) => {
    if (route.index === 0) {
      navigator.push(routes[2])
    }
  }

  renderScene = (route, navigator) => {
    console.log(`route: ${route}`)
    switch (route.index) {
      case 1:
        return <ContactPickerScene style={styles.container} />
      case 2:
        return <SimpleListScene style={styles.container} />
      default:
        return (<MainPageScene
          style={styles.container}
          handlePressedPickContact={this.handlePressedPickContact(route, navigator)}
          handlePressList={this.handlePressList(route, navigator)}
        />)
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.renderScene}
      />)
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
