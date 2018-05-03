import React, { Component } from 'react';
import {
    FlatList
} from 'react-native';
import FeedItem from './items/FeedItem';

export default class FeedAdapter extends Component {

    render() {
        return (
            <FlatList
                data={this.props.feed}
                renderItem={({ item }) => <FeedItem post={item} /> }
                keyExtractor={(item, index) => item.id} />
        );
    }
}