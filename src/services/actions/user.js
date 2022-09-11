import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'
import {setCookie, deleteCookie, getCookie} from '../../utils/utils'

export const USER_AUTHORIZATION = 'USER_AUTHORIZATION';
export const USER_UPDATE = 'USER_UPDATE';

export function getUserInfo(user) {
    return function (dispatch) {
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
                }
                return data.success;
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export function updateUserProfile(email, password, name) {
    return dispatch => {
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

export function userSignIn(userEmail, userPassword) {
    return dispatch => {
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
                setCookie('token', authToken, 0);
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

export function userSignOut(token) {
    return function (dispatch) {
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
        })
            .then(checkResponse)
            .then(data => data)
            .catch(e => {
                console.log(e.type);
            })
        deleteCookie('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('password');
    }
}