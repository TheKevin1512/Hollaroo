import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { defaultRoom } from '../../images';

export default class RoomItem extends Component {

    _onItemClicked() {
        this.props.onItemSelected(this.props.room.id);
    }

    render() {
        const room = this.props.room;
        return (
            <TouchableWithoutFeedback onPress={this._onItemClicked.bind(this)}>
                <View style={styles.itemContainer}>
                    <Image source={defaultRoom} />
                    <View style={styles.roomContainer}>
                        <Text style={styles.roomName}>{room.name}</Text>
                        <View style={styles.lastMessageContainer}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.lastMessageContent}>Hardcoded last message more text pls</Text>
                            <Text style={styles.lastMessageDateTime}>04 March 11:45</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        margin: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#88CCCCCC'
    },
    roomContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 8
    },
    roomName: {
        color: '#2F4F4F',
        fontWeight: 'bold',
        fontSize: 16
    },
    lastMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lastMessageContent: {
        color: 'gray',
        fontSize: 13,
        width: 150
    },
    lastMessageDateTime: {
        color: 'gray',
        fontSize: 13
    }
})