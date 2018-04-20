import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    Text,
    Button,
    View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
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

    /*
    onLoginPress:
      Changes the root value of the app to be 'after-login', changing it to tab view
    */
    onLoginPress() {
        firebase
            .auth()
            .signInAnonymouslyAndRetrieveData()
            .then((credential) => {
                if (credential) {
                    console.log('default app user', credential.user.toJSON());
                    this.props.dispatch(appActions.login());
                }
            })
            .catch((error) => {
                console.log("Shiet: ", error);
            })
    }
}


export default connect()(LoginScreen);