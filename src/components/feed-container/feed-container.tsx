import React, {useEffect} from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {FeedPage} from "../../pages";
import FeedDetails from "../feed-details/feed-details";
import {useDispatch} from "../../services/hook";
import {getCookie} from "../../utils/utils";
import {wsConnectionClosedAction, wsConnectionStartAction} from "../../services/actions/feed";
import {WS_URL, WS_URL_ALL} from "../../utils/data";
import {Modal} from "../modal/modal";
import {ProtectedRoute} from "../protected-route/protected-route";

export function FeedContainer() {

    const dispatch = useDispatch();
    const isUserOrder = useRouteMatch({path: '/profile/orders'});
    const token = isUserOrder ? `?token=${getCookie('token')}` : '';

    useEffect(() => {
        dispatch(
            isUserOrder
                ? wsConnectionStartAction(WS_URL + token)
                : wsConnectionStartAction(WS_URL_ALL)
        );
        return () => {
            dispatch(wsConnectionClosedAction());
        };
    }, [dispatch, isUserOrder]);
    return (
        <Switch>
            <Route path='/feed' exact={true}>
                <FeedPage/>
            </Route>
            <Route path='/profile/orders/' exact={true}>
                <FeedPage/>
            </Route>
            <Route path="/feed/:id" exact={true}>
                <FeedDetails/>
            </Route>
            <ProtectedRoute path="/profile/orders/:id" exact={true}>
                <FeedDetails/>
            </ProtectedRoute>
        </Switch>
    );
}