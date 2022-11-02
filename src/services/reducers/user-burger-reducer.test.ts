import {
    ADD_INGREDIENT_TO_BURGER,
    DELETE_INGREDIENT_FROM_BURGER
} from '../actions/user-burger';
import {AnyAction} from 'redux';
import {initialState, userBurgerReducer} from './user-burger-reducer';

describe('User burger reducer', () => {
    it('Should return the initial state', () => {
        expect(userBurgerReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    it('Should handle ADD_INGREDIENT_TO_BURGER', () => {

        const action = {
            type: ADD_INGREDIENT_TO_BURGER,
            payload:"",
        };

        const expectedState = {
            ...initialState,
        };

        expect(userBurgerReducer(initialState, action)).toEqual(expectedState);
    });
    it('Should handle DELETE_INGREDIENT_FROM_BURGER', () => {

        const action = {
            type: DELETE_INGREDIENT_FROM_BURGER,
            payload:"",
        };

        const expectedState = {
            ...initialState,
        };

        expect(userBurgerReducer(initialState, action)).toEqual(expectedState);
    });
});