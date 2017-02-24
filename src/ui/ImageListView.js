/**
 * Created by paynd on 22.02.17.
 */
import React, { Component, PropTypes } from 'react'
import { ListView, Text, View } from 'react-native'
import * as network from '../util/Network'

export default class ImageListView extends Component {
  state = {
    isData: false,
  }

  componentDidMount() {
    this.processNetworkRequest(network.getListOfImages())
  }

  onSuccess = (response) => {
    console.log(` responce typeof ${typeof response}`)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    // if (response.status !== 200) {
    //     console.log('### Status Code: ' + response.status);
    //     this.setState({
    //         isData: false
    //     });
    //     return;
    // }

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

  processNetworkRequest = (promise) => {
    promise.then(this.onSuccess).catch(this.onError)
  }

  renderList = () => {
    if (this.state.isData === false) {
      return <Text>No data loaded</Text>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => <RowItem rowData={rowData} />}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        {this.renderList()}
      </View>
    )
  }
}

class RowItem extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <Image
          source={{ uri: this.props.rowData.thumbnailUrl }}
          style={{ width: 150, height: 150 }}
        />
      </View>
    )
  }
}
