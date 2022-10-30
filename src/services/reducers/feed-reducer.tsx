import {
    GET_ORDERS,
    WS_CONNECTION_SUCCESS,
    TFeedActions
} from '../actions/feed';
import {TOrder} from '../../utils/types';

export type TFeedState = {
    ordersFullList: Array<TOrder>,
    doneToday: number,
    doneAllTime: number
};

export const initialState:TFeedState = {
    ordersFullList: [],
    doneToday: 0,
    doneAllTime: 0
};

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
            };
        }
        case GET_ORDERS: {
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