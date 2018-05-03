import React, { Component } from 'react';
import {
    Text,
    FlatList
} from 'react-native';
import UserItem from './items/UserItem';

export default class UserAdapter extends Component {

    _onItemSelected(uid) {
        this.props.onItemSelected(uid)
    }

    render() {
        return (
            <FlatList
                data={this.props.users}
                extraData={this.props.selected}
                renderItem={({ item }) => <UserItem
                    user={item}
                    onItemSelected={() => this._onItemSelected(item.uid)}
                    selected={this.props.selected.get(item.uid)} />
                }
                keyExtractor={(item, index) => item.uid} />
        )
    }
}