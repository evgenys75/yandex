import React, {FC} from 'react';
import {useContext, createContext} from 'react';
import {apiEndPoint} from '../utils/data';
import {checkResponse} from '../utils/utils'
import {userSignIn, userSignOut, getUserInfo, userForgotSuccess} from "./actions/user";
import {useSelector, useDispatch} from '../services/hook'

let AuthContext: any = '';

export const ProvideAuth: FC = ({children}) => {
    const auth = useProvideAuth();
    AuthContext = createContext(auth);
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth(): any {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const dispatch = useDispatch();
    const user = useSelector((store: any) => {
        return store.user;
    });
    const forgot = async (email: string) => {
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
    const reset = async (pass: string, token: string) => {
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
    const signOut = (token: string) => dispatch(userSignOut(token));
    const signIn = (email: string, password: string) =>
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