import {AnyAction} from 'redux';
import {initialState, feedReducer} from './feed-reducer';

describe('Feed reducer', () => {
    it('Should return the initial state', () => {
        expect(feedReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
});