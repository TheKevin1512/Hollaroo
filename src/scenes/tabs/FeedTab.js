import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Platform,
} from 'react-native';
import FeedAdapter from '../../adapter/FeedAdapter';
import { getFeed } from '../../firebase/FeedManager';
import { add } from '../../images'

export default class FeedTab extends Component {

    static navigatorButtons = {
        ...Platform.select({
            ios: {
                rightButtons: [
                    {
                        id: 'create',
                        systemItem: 'compose'
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
        getFeed((posts) => {
            this.setState({ posts });
        });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'create') {
                this.props.navigator.push({
                    screen: 'CreatePostScreen',
                    title: 'Create a post'
                })
            }
        }
    }

    render() {
        if (this.state.posts.length === 0) {
            return <Text>Loading ...</Text>
        }
        return <FeedAdapter feed={this.state.posts} />
    }
}