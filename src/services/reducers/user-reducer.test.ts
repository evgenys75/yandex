import {AnyAction} from 'redux';
import {initialState, userReducer} from './user-reducer';
import {
    USER_AUTHORIZATION,
    USER_UPDATE
} from '../actions/user';

describe('User reducer', () => {
    it('Should return the initial state', () => {
        expect(userReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    it('Should handle USER_AUTHORIZATION', () => {
        const action = {
            type: USER_AUTHORIZATION,
            payload: {
                data: { user: { name: "", email: "" } }
            }
        };

        const expectedState = {
            ...initialState,
            userAuth: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });
    it('Should handle USER_UPDATE', () => {
        const action = {
            type: USER_UPDATE,
            payload: {
                data: { user: { name: "", email: "" } }
            }
        };

        const expectedState = {
            ...initialState,
            userAuth: false
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });
});