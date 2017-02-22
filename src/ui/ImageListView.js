/**
 * Created by paynd on 22.02.17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import * as network from '../util/Network'


export default class ImageListView extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: network.getListOfImages()
        };
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <RowItem>{rowData}</RowItem> }/>
            </View>
        )
    }
}

class RowItem extends Component {
    constructor(props) {
        super(props);
        this.state.jsonItem = this.props.children;
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <Image source={{uri: this.state.jsonItem.thumbnailUrl}}
                       style={{width: 150, height: 150}} />
            </View>
        )
    }
}