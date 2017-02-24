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
        this.state = {
            isData: false
        };
        this.processNetworkRequest.bind(this);
        this.renderList.bind(this);
        this.onSucces.bind(this);
        this.onError.bind(this);
    }

    componentDidMount(){
        this.processNetworkRequest(network.getListOfImages());
    }

    onSucces(response) {
        console.log(" responce typeof " + typeof response);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        // if (response.status !== 200) {
        //     console.log('### Status Code: ' + response.status);
        //     this.setState({
        //         isData: false
        //     });
        //     return;
        // }

        console.log('### Ok');

        response.json().then((data) => {
            console.log("### array legth: " + data.length);
            this.setState({
                dataSource: ds.cloneWithRows(data), // here I got "Possible Unhandled Promise Rejection (id: 0):"
                isData: true
            });
        });
    }

    onError(err){
        console.error("### Shit happens: ", err);
        this.setState({
            isData: false
        });
    }

    processNetworkRequest(promise) {
        promise.then(this.onSucces);
        promise.catch(this.onError)
    };

    renderList() {
        if (this.state.isData === false) {
            return <Text>No data loaded</Text>
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