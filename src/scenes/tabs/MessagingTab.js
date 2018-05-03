import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import RoomAdapter from '../../adapter/RoomAdapter';
import { getRooms } from '../../firebase/RoomManager';
import { add } from '../../images';
import firebase from 'react-native-firebase';

export default class MessagingTab extends Component {

    static navigatorButtons = {
        ...Platform.select({
            ios: {
                rightButtons: [
                    {
                        id: 'create',
                        systemItem: 'compose'
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
        this.state = {
            rooms: []
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        getRooms(firebase.auth().currentUser.uid, (rooms) => this.setState({ rooms }));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'create') {
                this.props.navigator.push({
                    screen: 'CreateRoomScreen',
                    title: 'Select a stranger'
                });
            }
        }
    }

    _onItemSelected = (id) => {
        //TODO: Open chat
        console.log("Open chat: ", id);
    }

    render() {
        if (this.state.rooms.length === 0) {
            return <Text>Loading ...</Text>
        }
        return <RoomAdapter rooms={this.state.rooms} onItemSelected={this._onItemSelected} />
    }
}