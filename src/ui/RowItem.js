/**
 * Created by paynd on 24.02.17.
 */
import React from 'react'
import { View, Text, StyleSheet, Image, PropTypes } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  text: {
    height: 60,
    marginLeft: 12,
    padding: 10,
    fontSize: 16,
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
})

/**
 * @param props expects to contain url, thumbnailUrl, text
 * @constructor
 */
const RowItemRenderer = props => (
  <View style={styles.container}>
    <Image source={{ uri: props.thumbnailUrl }} style={styles.photo} />
    <Text style={styles.text}>
      {props.title}
    </Text>
  </View>
)

// RowItemRenderer.propTypes = {
//   title: PropTypes.string.isRequired,
//   thumbnailUrl: PropTypes.string.isRequired,
// }

export default RowItemRenderer
