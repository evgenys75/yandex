import {
    WS_CONNECTION_SUCCESS,
    GET_ORDERS,
} from '../actions/feed';
import {AnyAction} from 'redux';
import {initialState, feedReducer} from './feed-reducer';

describe('Feed reducer', () => {
    it('Should return the initial state', () => {
        expect(feedReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    it('Should handle WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS
        };
        const expectedState = {
            ...initialState
        };

        expect(feedReducer(initialState, action)).toEqual(expectedState);
    });
    it('Should handle GET_ORDERS', () => {
        const action = {
            type: GET_ORDERS,
            payload: {
                data: { orders: {  } }
            }
        };
        const expectedState = {
            ...initialState,
            doneAllTime: undefined,
            doneToday: undefined,
            ordersFullList: undefined,
        };

        expect(feedReducer(initialState, action)).toEqual(expectedState);
    });
});