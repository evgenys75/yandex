import {
    CREATE_ORDER,
} from '../actions/order';

const initialState = {
    orderId: null,
};

export const orderReducer = (state = initialState, action:any) => {
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