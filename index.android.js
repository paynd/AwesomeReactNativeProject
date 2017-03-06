/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry,
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View } from 'react-native'
// import Blink from './src/ui/Blink'
import ImageListView from './src/ui/ImageListView'
import ContactPicker from './src/modules/ContactPicker'

const onPickContactPressed = () => {
  const result = ContactPicker.selectContact(false)
  console.log(`picking result:${result}`)
}
const onRequestPermissionPressed = () => {
  requestReadContacts()
}
export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Button
          onPress={onPickContactPressed}
          title="Pick contact"
          style={styles.button}
          accessibilityLabel="Bla-bla accessibilityLabel"
        />
        <Button
          onPress={onRequestPermissionPressed}
          title="Request Permission"
          style={styles.button}
          accessibilityLabel="Bla-bla accessibilityLabel"
        />

        <ImageListView />
      </View>
    )
  }
}
async function requestReadContacts() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Cool Read contacts Permission',
        message: 'Awesome App needs access to your contacts ' +
        'so you can take awesome pictures.',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read contacts')
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('NEVER_ASK_AGAIN')
    } else {
      console.log('Contacts permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    textAlign: 'center',
    color: '#841584',
    margin: 5,
    padding: 10,
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
