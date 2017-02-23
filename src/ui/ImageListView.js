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
    constructor(props) {
        super(props);
        let promise = network.getListOfImages();
        this.state.isData = false;
        this.processNetworkRequest(promise);
        this.processNetworkRequest.bind(this);
        this.renderList.bind(this);
    }

    processNetworkRequest (){
        promise.then(function (response) {
            console.log(" responce typeof " + typeof response);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            if (response.status !== 200) {
                console.log('### Looks like there was a problem. Status Code: ' +
                    response.status);
                this.state.isData = false;
                return;
            }

            console.log('### Ok');

            response.json().then(function (data) {
                console.log("### array legth: " + data.length);
                this.state.setState({
                    dataSource: ds.cloneWithRows(data), // here I got "Possible Unhandled Promise Rejection (id: 0):"
                    isData: true
                });
            });
        });

        promise.catch(function (err) {
            console.error("### Shit happens: ", err);
            this.state.setState({
                isData: false
            });
        })
    };

    renderList (){
        if (this.state.isData) {
            return <p>No data loaded</p>
        } else {
            return <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <RowItem>{rowData}</RowItem> }/>;
        }
    };

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                {this.renderList()}
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
                       style={{width: 150, height: 150}}/>
            </View>
        )
    }
}