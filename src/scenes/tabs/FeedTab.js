import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { add } from '../../images'
import * as  appActions from '../../actions/index';

export default class FeedTab extends Component {
    static navigatorButtons = {
        ...Platform.select({
            ios: {
                rightButtons: [
                    {
                      title: 'Create',
                      id: 'create',
                      buttonColor: 'blue',
                      buttonFontSize: 14,
                      buttonFontWeight: '600'
                    }
                  ]
            },
            android: {
                fab: {
                    collapsedId: 'create',
                    collapsedIcon: add,
                    backgroundColor: '#607D8B'
                }
            }
        })
      };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'create') {
                this.props.navigator.push({
                    screen: 'CreateScreen',
                    title: 'Create a post'
                })
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    HOME
        </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});