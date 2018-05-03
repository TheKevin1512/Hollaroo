import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import registerScreens from './src/scenes/';
import * as reducers from "./src/reducers/index";
import * as appActions from "./src/actions/index";
import thunk from "redux-thunk";
import { messaging, feed } from './src/images';
import { createUser } from './src/firebase/UserManager';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

export default class App extends Component {

  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        createUser(user._user);
        store.dispatch(appActions.login());
      } else {
        store.dispatch(appActions.appInitialized());
      }
    });
  }

  onStoreUpdate() {
    let { root } = store.getState().root;
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'LoginScreen'
          },
        });
        return;

      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              screen: 'FeedTab',
              icon: feed,
              title: 'Hollaroo',
              overrideBackPress: false,
            },
            {
              screen: 'MessagingTab',
              icon: messaging,
              title: 'Messages',
            }
          ],
        });
        return;

      default:
        console.log("Not Root Found");
    }
  }
}