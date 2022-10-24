import {
    CREATE_ORDER,
    TOrderActions
} from '../actions/order';

export type TOrderState = {
    orderId: string | null,
};

const initialState: TOrderState = {
    orderId: null,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case CREATE_ORDER: {
            return {...state, orderId: action.data.number};
        }
        default: {
            return state;
        }
    }
};