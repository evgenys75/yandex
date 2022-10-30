import {AnyAction} from 'redux';
import {initialState, orderReducer} from './order-reducer';

describe('Order reducer', () => {
    it('Should return the initial state', () => {
        expect(orderReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
});