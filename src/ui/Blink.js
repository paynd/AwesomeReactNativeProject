/**
 * Created by paynd on 21.02.17.
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

export default class Blink extends Component {
  constructor(props) {
    super(props)
    this.state = { showText: true }
    this.state.textValue = this.props.children
    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText })
    }, 1000)
  }

  render() {
    const display = this.state.showText ? this.state.textValue : ' '
    return (
      <Text>{display}</Text>
    )
  }
}
