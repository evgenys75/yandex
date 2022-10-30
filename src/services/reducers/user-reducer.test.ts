import {AnyAction} from 'redux';
import {initialState, userReducer} from './user-reducer';

describe('User reducer', () => {
    it('Should return the initial state', () => {
        expect(userReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
});