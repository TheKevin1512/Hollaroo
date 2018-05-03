import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback
} from 'react-native';
export default class UserItem extends Component {

    _onItemClicked() {
        this.props.onItemSelected(this.props.user.uid);
    }

    render () {
        const { user } = this.props
        return (
            <TouchableWithoutFeedback onPress={this._onItemClicked.bind(this)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemSelected}>{this.props.selected ? 'V' : 'X'}</Text>
                    <Image style={styles.userImage} source={{ uri: user.photoURL }} />
                    <Text style={styles.userRange}>12 km</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        margin: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#88CCCCCC'
    },
    userImage: {
        width: 96,
        height: 96,
        borderRadius: 96 / 2,
        borderWidth: 1,
        borderColor: 'blue',
        alignSelf: 'center'
    },
    userRange: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    itemSelected: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
})