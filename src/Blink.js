/**
 * Created by paynd on 21.02.17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import * as dataloading from "./src/DataLoading";

export default class Blink extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        dataloading.getListOfImages();

        // Toggle the state every second
        setInterval(() => {
            this.setState({showText: !this.state.showText});
        }, 1000);
    }

    render() {
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}
