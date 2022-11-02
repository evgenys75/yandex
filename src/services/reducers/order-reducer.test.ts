import {
    CREATE_ORDER
} from '../actions/order';
import {AnyAction} from 'redux';
import {initialState, orderReducer} from './order-reducer';

describe('Order reducer', () => {
    const data = [{
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
    }];
    it('Should return the initial state', () => {
        expect(orderReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    it('Should handle CREATE_ORDER', () => {
        const action = {
            type: CREATE_ORDER,
            data
        };

        const expectedState = {
            ...initialState,
            orderId: undefined
        };

        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });
});