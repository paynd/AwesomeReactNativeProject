/**
 * Created by paynd on 21.02.17.
 */

import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'

export default class Blink extends Component {
  static propTypes = {
    children: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { showText: true,
      textValue: this.props.children,
    }
    // this.state.textValue = this.props.children
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
