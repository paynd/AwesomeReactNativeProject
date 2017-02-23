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

// function onFullfilled() {
//     this.state
// }
//
// function onRejected() {
//
// }


export default class ImageListView extends Component {


    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        let promise = network.getListOfImages();
        promise.then(function (response) {
            if (response.status !== 200) {
                console.log('### Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }else {
                console.log('### Ok');
            }

            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                console.log('### Error');
            });
        });

        promise.catch(function (err) {
            console.error("### Shit happens: ", err)
        });
        this.state.dataSource = ['One','two'];
    }

    componentDidMount() {

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
                       style={{width: 150, height: 150}}/>
            </View>
        )
    }
}