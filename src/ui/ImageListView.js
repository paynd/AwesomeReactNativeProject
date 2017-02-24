/**
 * Created by paynd on 22.02.17.
 */
import React, { Component } from 'react'
import { ListView, Text, View, StyleSheet } from 'react-native'
import getListOfImages from '../util/Network'
import RowItemRenderer from './RowItem'

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E',
  },
})

export default class ImageListView extends Component {
  state = {
    isData: false,
  }

  componentDidMount() {
    getListOfImages().then(this.onSuccess).catch(this.onError)
  }

  onSuccess = (response) => {
    // console.log(` response typeof ${typeof response}`)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    console.log('### Ok')

    response.json().then((data) => {
      console.log(`### array legth: ${data.length}`)
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isData: true,
      })
    })
  }

  onError = (err) => {
    console.error('### Shit happens: ', err)
    this.setState({
      isData: false,
    })
  }

  renderList = () => {
    if (this.state.isData === false) {
      return <Text>No data loaded</Text>
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={data => <RowItemRenderer {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 10, paddingTop: 22 }}>
        {this.renderList()}
      </View>
    )
  }
}
