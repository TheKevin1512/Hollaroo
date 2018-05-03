import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import CardView from 'react-native-cardview';

export default class FeedItem extends Component {
    render() {
        const post = this.props.post;
        return (
            <CardView
                style={styles.itemContainer}
                cardElevation={3}
                cornerRadius={5}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={{ uri: post.photoURL }} />
                    <View style={styles.userContainer}>
                        <Text style={styles.userName}>{post.displayName}</Text>
                        <Text style={styles.postDateTime}>{post.dateTime}</Text>
                    </View>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
            </CardView>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: 75,
        margin: 8,
        alignSelf: 'stretch',
        padding: 8
    },
    profileContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'orange'
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 8
    },
    userName: {
        color: '#2F4F4F',
        fontWeight: 'bold',
        fontSize: 16
    },
    postDateTime: {
        color: 'gray',
        fontSize: 13
    },
    postContent: {
        padding: 8,
        alignSelf: 'center'
    }
})