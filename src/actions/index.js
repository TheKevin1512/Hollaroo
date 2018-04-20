import * as actions from './actionTypes';

export function changeAppRoot(root) {
    return {
        type: actions.ROOT_CHANGED,
        root: root
    };
}

export function appInitialized() {
    return async function(dispatch, getState) {
        dispatch(changeAppRoot('login'));
    }
}

export function login() {
    return async function(dispatch, getState) {
        dispatch(changeAppRoot('after-login'));
    }
}