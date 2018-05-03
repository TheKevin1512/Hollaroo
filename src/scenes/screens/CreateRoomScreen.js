import React, { Component } from 'react';
import {
    Text,
    Platform
} from 'react-native';
import UserAdapter from '../../adapter/UserAdapter';
import { done } from '../../images';
import { createRoom } from '../../firebase/RoomManager';
import { getUsers } from '../../firebase/UserManager';

export default class CreateRoomScreen extends Component {

    static navigatorButtons = {
        ...Platform.select({
            ios: {
                rightButtons: [{
                    id: 'done',
                    systemItem: 'done'
                }]
            },
            android: {
                rightButtons: [{
                    id: 'done',
                    icon: done
                }]
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selected: new Map()
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        getUsers((users) => this.setState({ users }));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'done') {
                this._onDoneClicked();
                this.props.navigator.pop();
            }
        }
    }

    _onItemSelected = (id) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return { selected };
        });
    }

    _onDoneClicked() {
        const roomName = "Hardcoded Room Name";
        var chatters = {};
        for (const [uid, selected] of this.state.selected.entries()) {
            if (selected) {
                chatters[uid] = selected;
            }
        }
        createRoom(roomName, chatters);
    }

    render() {
        if (this.state.users.length === 0) {
            return <Text>Loading ...</Text>
        }
        return <UserAdapter
            users={this.state.users}
            selected={this.state.selected}
            onItemSelected={this._onItemSelected} />
    }
}
