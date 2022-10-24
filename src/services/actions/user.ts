import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'
import {setCookie, deleteCookie, getCookie} from '../../utils/utils'
import {TUser} from '../../utils/types';
import {AppDispatch} from '../../services/types';


export const USER_AUTHORIZATION: 'USER_AUTHORIZATION' = 'USER_AUTHORIZATION';
export const USER_UPDATE: 'USER_UPDATE' = 'USER_UPDATE';
export const USER_FORGOT_SUCCESS: 'USER_FORGOT_SUCCESS' = 'USER_FORGOT_SUCCESS';

export interface IUserForgotSuccessAction {
    readonly type: typeof USER_FORGOT_SUCCESS;
}

export interface IUserAuthorizationAction {
    readonly type: typeof USER_AUTHORIZATION;
    readonly payload: any;
}

export interface IUserUpdateAction {
    readonly type: typeof USER_UPDATE;
    readonly payload: any;
}


export type TUserActions =
    | IUserForgotSuccessAction
    | IUserAuthorizationAction
    | IUserUpdateAction
    ;

export function userForgotSuccess() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: USER_FORGOT_SUCCESS
        });
    }
}

export function updateToken() {
    return fetch(`${apiEndPoint}auth/token`)

        .then(checkResponse)
        .then(data => {
            if (data && data.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                setCookie('token', accessToken, 0);
                localStorage.setItem('refreshToken', refreshToken);
            }
        })
        .catch(e => {
            console.log(e);
        })
};

export function getUserInfo() {
    return (dispatch: AppDispatch) => {
        fetch(`${apiEndPoint}auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }).then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: USER_AUTHORIZATION,
                        payload: {data}
                    })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export function updateUserProfile(email: string, password: string, name: string) {
    return (dispatch: AppDispatch) => {
        fetch(`${apiEndPoint}auth/user`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + getCookie('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        }).then(checkResponse).then((data) => {
            if (data && data.success === true) {
                dispatch({
                    type: USER_UPDATE,
                    payload: {data},
                });
            }
        }).catch((error) => {
            console.log(error);
        });


    }
}

export function userSignIn(userEmail: string, userPassword: string) {
    return (dispatch: AppDispatch) => {
        fetch(`${apiEndPoint}auth/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "email": userEmail,
                "password": userPassword
            })
        }).then(checkResponse).then((data) => {
            let authToken;
            if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
                authToken = data.accessToken.split('Bearer ')[1];
            }
            if (authToken) {
                if (!getCookie('token')) setCookie('token', authToken, 0);
                localStorage.setItem('refreshToken', `${data.refreshToken}`);
            }
            if (data.success) {
                dispatch({
                    type: USER_AUTHORIZATION,
                    payload: {data}
                })
            }
        }).catch((error) => {
            console.log(error);
        });


    }
}

export function userSignOut(token: string) {
    return function (dispatch: AppDispatch) {
        fetch(`${apiEndPoint}auth/logout`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({'token': token})
        }).then(checkResponse).then((data) => {
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('password');
        })
            .catch(e => {
                console.log(e.type);
            })

    }
}

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST: 'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED: 'TOKEN_FAILED' = 'TOKEN_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

// LOGIN INTERFACE
export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

// LOGOUT INTERFACE
export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

// UPDATE_TOKEN INTERFACE
export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

// GET_USER INTERFACE
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

// UPDATE_USER INTERFACE
export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

// REGISTER INTERFACE
export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

// FORGOT_PASSWORD INTERFACE
export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

// RESET_PASSWORD INTERFACE
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TAuthActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;