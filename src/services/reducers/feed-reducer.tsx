import {
    GET_ORDERS,
    WS_CONNECTION_SUCCESS
} from '../actions/feed';
import {TOrder} from '../../utils/types';

export type TOrderState = {
    ordersFullList: Array<TOrder>,
    doneToday: number,
    doneAllTime: number
};

const initialState: TOrderState = {
    ordersFullList: [],
    doneToday: 0,
    doneAllTime: 0
};

export const feedReducer = (state = initialState, action: any): TOrderState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
            };
        }
        case GET_ORDERS: {
            console.log(action);
            return {
                ...state,
                ordersFullList: action.payload.orders,
                doneToday: action.payload.totalToday,
                doneAllTime: action.payload.total
            };
        }
        default: {
            return state;
        }
    }
};