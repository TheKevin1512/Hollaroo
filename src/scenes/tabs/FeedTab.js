import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    Image
} from 'react-native';
import CardView from 'react-native-cardview';
import firebase from 'react-native-firebase';
import { add, defaultUser } from '../../images'

const db = firebase.firestore();

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
        this.state = {
            posts: []
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        db
            .collection('posts')
            .onSnapshot((snapshot) => {
                let posts = []
                snapshot.forEach((post) => {
                    posts.push(post.data());
                })
                this.setState({ posts });
            }, (error) => {
                console.error("Could not retrieve snapshot for feed", error);
            });
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
        if (this.state.posts.length === 0) {
            return <Text>Loading ...</Text>
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => {
                        return <CardView
                            style={styles.itemContainer}
                            cardElevation={3}
                            cornerRadius={5}>
                            <View style={styles.profileContainer}>
                                <Image source={defaultUser} />
                                <View style={styles.userContainer}>
                                    <Text style={styles.itemUsername}>{item.userId}</Text>
                                    <Text style={styles.itemDateTime}>{item.dateTime}</Text>
                                </View>
                            </View>
                            <Text style={styles.itemContent}>{item.content}</Text>
                        </CardView>
                    }}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: 75,
        margin: 8,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        padding: 8
    },
    profileContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 8
    },
    itemUsername: {
        color: '#2F4F4F',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemDateTime: {
        color: 'gray',
        fontSize: 13
    },
    itemContent: {
        padding: 8,
        alignSelf: 'center'
    }
});