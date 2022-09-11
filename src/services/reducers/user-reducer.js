import {
    USER_AUTHORIZATION,
    USER_UPDATE
} from '../actions/user';

const initialState = {
    userAuth: false,
    userAuthProfile: {
        email: '',
        name: ''
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE: {
            console.log(action);
            return {...state, userAuthProfile:{email:action.payload.data.user.email,name:action.payload.data.user.name}};
        }
        case USER_AUTHORIZATION: {
            return {...state, userAuth: true,userAuthProfile:{email:action.payload.data.user.email,name:action.payload.data.user.name}};
        }
        default: {
            return state;
        }
    }
};