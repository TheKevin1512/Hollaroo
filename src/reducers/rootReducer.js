import * as actions from '../actions/actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined
});

export function root(state = initialState, action = {}) {
    switch(action.type) {
        case actions.ROOT_CHANGED:
            return state.merge({
                root: action.root
            });
        default:
            return state;
    }
}