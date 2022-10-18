import {
    CREATE_ORDER,
} from '../actions/order';

export type TOrderState = {
    orderId: string | null,
};

const initialState: TOrderState = {
    orderId: null,
};

export const orderReducer = (state = initialState, action: any): TOrderState => {
    switch (action.type) {
        case CREATE_ORDER: {
            console.log(action);
            return {...state, orderId: action.data.number};
        }
        default: {
            return state;
        }
    }
};