import {useContext, createContext} from 'react';
import React from 'react';
import {apiEndPoint} from '../utils/data';
import {checkResponse} from '../utils/utils'
import {userSignIn, userSignOut, getUserInfo, userForgotSuccess} from "./actions/user";
import {useDispatch, useSelector} from "react-redux";

const AuthContext = createContext(undefined);

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const dispatch = useDispatch();
    const user = useSelector((store) => {
        return store.user;
    });
    const forgot = async email => {
        const request = `{"email": "${email}"}`;
        fetch(`${apiEndPoint}password-reset`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: request,
        }).then(checkResponse).then((data) => {
            dispatch(userForgotSuccess());
            return data.success;
        }).catch((error) => {
            console.log(error);
        });
    };
    const reset = async (pass:string, token:string) => {
        const request = `{"password": "${pass}","token": "${token}"}`;
        fetch(`${apiEndPoint}password-reset/reset`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: request,
        }).then(checkResponse).then((data) => {
            console.log(data);
            return data.success;
        }).catch((error) => {
            console.log(error);
        });
    };
    const signOut = (token) => dispatch(userSignOut(token));
    const signIn = (email, password) =>
        dispatch(userSignIn(email, password));
    const getUser = () => {
        dispatch(getUserInfo(user));
    }

    return {
        user,
        getUser,
        forgot,
        signOut,
        signIn,
        reset
    };
}