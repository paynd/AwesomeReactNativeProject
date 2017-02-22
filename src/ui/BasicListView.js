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

export default class BasicListView extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <br><Text>{rowData}</Text>}
                />
            </View>
        );
    }
}