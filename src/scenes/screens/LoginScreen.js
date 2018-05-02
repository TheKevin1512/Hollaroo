import React, { Component } from 'react';
import {
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import * as appActions from '../../actions/index';

export class LoginScreen extends Component {

    render() {
        return <Button large title="Login" onPress={this._signIn.bind(this)}>Login!</Button>
    }

    async _signIn() {
        try {
            await GoogleSignin.configure({
                iosClientId: '481158133601-g5lfdm5lasmv9c0iitsu6evndp66ecmv.apps.googleusercontent.com',
                shouldFetchBasicProfile: true
            });

            const data = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            firebase.auth().signInAndRetrieveDataWithCredential(credential);
        } catch (e) {
            //TODO: Animate login button again.
            console.error(e);
        }
    }
}

export default connect()(LoginScreen);