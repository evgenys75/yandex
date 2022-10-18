import {
    USER_AUTHORIZATION,
    USER_UPDATE,
    USER_FORGOT_SUCCESS
} from '../actions/user';

export type TUserState = {
    userAuth: boolean,
    userForgotPasswordSuccess: boolean,
    userAuthProfile: {
        email: string,
        name: string
    }
};

const initialState: TUserState = {
    userAuth: false,
    userForgotPasswordSuccess: false,
    userAuthProfile: {
        email: '',
        name: ''
    }
};

export const userReducer = (state = initialState, action: any): TUserState => {
    switch (action.type) {
        case USER_FORGOT_SUCCESS: {
            return {
                ...state,
                userForgotPasswordSuccess: true
            };
        }
        case USER_UPDATE: {
            return {
                ...state,
                userAuthProfile: {email: action.payload.data.user.email, name: action.payload.data.user.name}
            };
        }
        case USER_AUTHORIZATION: {
            return {
                ...state,
                userAuth: true,
                userAuthProfile: {email: action.payload.data.user.email, name: action.payload.data.user.name}
            };
        }
        default: {
            return state;
        }
    }
};