/**
 * Created by paynd on 08.03.17.
 */
import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default class MainPageScene extends Component {
  static get defaultProps() {
    return {
      route: { title: 'Pick Contact', index: 0 },
    }
  }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.welcome}>
        {this.props.route.title}
      </Text>
      <Button
        onPress={this.props.handlePressedPickContact}
        style={styles.buttons}
        title={'Contacts'}
      />
      <Button
        onPress={this.props.handlePressList}
        style={styles.buttons}
        title={'List'}
      />
    </View>)
  }
}
//
MainPageScene.propTypes = {
  handlePressedPickContact: React.PropTypes.func,
  handlePressList: React.PropTypes.func,
  route: React.PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    padding: 80,
    paddingTop: 140,
    paddingBottom: 140,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    flex: 1,
    height: 180,
    width: 250,
    padding: 20,
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
})
