import {
    GET_INGREDIENTS,
} from '../actions/ingredients';
import {AnyAction} from 'redux';
import {initialState, ingredientsReducer} from './ingredients-reducer';

describe('Feed reducer', () => {
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
        expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    it('Should handle GET_INGREDIENTS', () => {
        const action = {
            type: GET_INGREDIENTS,
            data
        };

        const expectedState = {
            ...initialState,
            ingredientsFullList: undefined
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });
});
