import React, { Component } from 'react';
import {
    Button,
    TextInput,
    StyleSheet,
    Platform,
    Text,
    View
} from 'react-native';
import firebase from 'react-native-firebase';
import { createPost } from '../../firebase/FeedManager';
import Post from '../../models/Post';

export default class CreateScreen extends Component {

    static navigatorButtons = {
        ...Platform.select({
            ios: {
                rightButtons: [{
                    title: 'Done',
                    id: 'done',
                    buttonColor: 'blue',
                    buttonFontSize: 14,
                    buttonFontWeight: '600'
                }]
            }
        })
    }

    constructor(props) {
        super(props);
        this._onDoneClicked = this._onDoneClicked.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'done') {
                this._onDoneClicked();
                this.props.navigator.pop();
            }
        }
    }

    _onDoneClicked() {
        const currentUser = firebase.auth().currentUser;
        const post = new Post(
            currentUser.uid, 
            currentUser.displayName, 
            currentUser.photoURL, 
            this.state.text, 
            new Date().toLocaleString()
        );
        createPost(post);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Say something to the public"}
                    onChangeText={(text) => this.setState({ text })}
                    style={styles.textInput} />
                {
                    Platform.OS == 'android' ?
                        <View style={styles.buttonContainer}>
                            <Button onPress={this._onDoneClicked} title="Done">Done</Button>
                        </View>
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInput: {
        alignSelf: 'stretch',
        maxHeight: 150,
        fontSize: 20,
        margin: 8
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 16
    }
})