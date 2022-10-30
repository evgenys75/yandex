import {AnyAction} from 'redux';
import {initialState, userBurgerReducer} from './user-burger-reducer';

describe('User burger reducer', () => {
    it('Should return the initial state', () => {
        expect(userBurgerReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
});