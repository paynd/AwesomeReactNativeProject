/**
 * Created by paynd on 08.03.17.
 */
import React, { Component } from 'react'
import { Button, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E',
  },
})

const onPickContactPressed = () => {
}
const onAskPermission = () => {
}

export default class ImageListView extends Component {
  static get defaultProps() {
    return {
      route: { title: 'Pick Contact', index: 1 },
    }
  }
  render() {
    return (<View>
      <Button
        onPress={onPickContactPressed}
        style={styles.button}
        title={this.props.route.title}>
      Contacts
    </Button>
      <Button
        onPress={onAskPermission}
        style={styles.button}
        title={this.props.route.title}>
    List
    </Button>
    </View>
    )
  }
}

ImageListView.propTypes = {
  route: React.PropTypes.object,
}
