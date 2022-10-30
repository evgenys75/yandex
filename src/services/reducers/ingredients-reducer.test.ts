import {AnyAction} from 'redux';
import {initialState, ingredientsReducer} from './ingredients-reducer';

describe('Feed reducer', () => {
    it('Should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
});
