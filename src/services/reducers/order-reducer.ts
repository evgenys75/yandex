import {
    CREATE_ORDER
} from '../actions/order';
import {AnyAction} from "redux";

export type TOrderState = {
    orderId: string | null,
};

export const initialState: TOrderState = {
    orderId: null,
};

export const orderReducer = (state = initialState, action: AnyAction): TOrderState => {
    switch (action.type) {
        case CREATE_ORDER: {
            return {...state, orderId: action.data.number};
        }
        default: {
            return state;
        }
    }
};