import React, { Component } from 'react';
import {
    Text,
    Button,
    View
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as appActions from '../../actions/index';

export class LoginScreen extends Component {

    render() {
        return (
            <View>
                <Button large onPress={() => this.onLoginPress()} title="Login">
                    <Text> Login</Text>
                </Button>
            </View>

        );
    }

    onLoginPress() {
        firebase
            .auth()
            .signInAnonymouslyAndRetrieveData()
            .then((credential) => {
                if (credential) {
                    this.props.dispatch(appActions.login());
                }
            })
            .catch((error) => console.log("Could not authenticate: ", error));
    }
}

export default connect()(LoginScreen);