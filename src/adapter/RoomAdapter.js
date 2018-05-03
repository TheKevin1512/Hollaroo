import React, { Component } from 'react';
import {
    FlatList
} from 'react-native';
import RoomItem from './items/RoomItem';

export default class RoomAdapter extends Component {

    _onItemSelected(uid) {
        this.props.onItemSelected(uid)
    }

    render() {
        return (
            <FlatList
                data={this.props.rooms}
                renderItem={({ item }) => <RoomItem
                    room={item}
                    onItemSelected={() => this._onItemSelected(item.id)} />}
                keyExtractor={(item, index) => item.id} />
        );
    }
}