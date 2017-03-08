/**
 * Created by paynd on 08.03.17.
 */
import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ContactPickerScene from './ContactPickerScene'
import SimpleListScene from './SimpleListScene'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons: {
    textAlign: 'center',
    color: '#333333',
    padding: 20,
    marginBottom: 5,
  },
})

const onPickContactPressed = (navigator, routes, route) => {
  if (route.index === 0) {
    navigator.push(routes[1])
  }
}
const onPressList = (navigator, routes, route) => {
  if (route.index === 0) {
    navigator.push(routes[2])
  }
}

export default class MainPageScene extends Component {
  static get defaultProps() {
    return { // fixme - does it valid?
      route: { title: 'Pick Contact', index: 0 },
    }
  }

  render() {
    if (this.props.route.index === 1) {
      return <ContactPickerScene title={this.props.route.title} />
    } else if (this.props.route.index === 2) {
      return <SimpleListScene />
    }

    return (<View style={styles.container}>
      <Text style={styles.welcome}>
        {this.props.title}
      </Text>
      <Button
        onPress={onPickContactPressed(this.props.navigator, this.props.routes, this.props.route)}
        style={styles.buttons}
        title={this.props.route.title}>
            Contacts
          </Button>
      <Button
        onPress={onPressList(this.props.navigator, this.props.routes, this.props.route)}
        style={styles.buttons}
        title={this.props.route.title}>
            List
          </Button>
    </View>)
  }
}
//
MainPageScene.propTypes = {
  route: React.PropTypes.object,
}
