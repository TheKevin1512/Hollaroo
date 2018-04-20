import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/scenes/';
import * as reducers from "./src/reducers/index";
import * as appActions from "./src/actions/index";
import thunk from "redux-thunk";
import { messaging, feed } from './src/images';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

export default class App extends Component {

  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
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
            screen: 'Login', 
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
          },
        });
        return;

      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              screen: 'FeedTab',
              icon: feed,
              title: 'Feed',
              overrideBackPress: false,
              navigatorStyle: {}
            },
            {
              screen: 'MessagingTab',
              icon: messaging,
              title: 'Hey',
              navigatorStyle: {}
            }
          ],
        });
        return;

      default:
        console.log("Not Root Found");
    }
  }
}