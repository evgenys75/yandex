import {WS_URL_ALL, WS_URL} from '../../utils/data';
import {getCookie} from '../../utils/utils';
import {TOrder} from "../../utils/types";
import {AppThunk} from "../types/index";
import {AppDispatch} from '../../services/types';
export const FEED_REQUEST: 'FEED_REQUEST' = 'FEED_REQUEST';
export const GET_ORDERS: 'GET_ORDERS' = 'GET_ORDERS';
export const GET_USER_ORDERS: 'GET_USER_ORDERS' = 'GET_USER_ORDERS';
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_ORDER_GET: 'WS_ORDER_GET' = 'WS_ORDER_GET';

export interface IGetOrdersAction {
    readonly type: typeof GET_ORDERS;
    readonly payload: any;
}

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSOrderGetAction {
    readonly type: typeof WS_ORDER_GET;
    readonly payload: TOrder;
}

export type TFeedActions =
    | IGetOrdersAction
    | IWSConnectionStartAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSOrderGetAction;

export const getOrdersAction = (): IGetOrdersAction => ({
    type: GET_ORDERS,
    payload: null
});
export const getOrdersFullList: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getOrdersAction());
    const ws = new WebSocket(WS_URL_ALL);
    ws.onmessage = (event: MessageEvent) => {
        dispatch({type: GET_ORDERS, payload: JSON.parse(event.data)});
    }
}
export const getOrdersUserList: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getOrdersAction());
    const token = `?token=${getCookie('token')}`;
    const ws = new WebSocket(WS_URL + token);
    ws.onmessage = (event: MessageEvent) => {
        dispatch({type: GET_ORDERS, payload: JSON.parse(event.data)});
    }
}
export const wsConnectionStartAction = (payload: string): IWSConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload
});

export const wsOrderConnectionSuccessAction = (): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsOrderConnectionErrorAction = (): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR
});

export const wsConnectionClosedAction = (): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const wsOrderGetAction = (payload: TOrder): IWSOrderGetAction => ({
    type: WS_ORDER_GET,
    payload
});

export type TWSOrderActions = {
    wsInit: typeof WS_CONNECTION_START;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onError: typeof WS_CONNECTION_ERROR;
    onClose: typeof WS_CONNECTION_CLOSED;
    onOrders: typeof GET_ORDERS;
};
export const wsOrderActions: TWSOrderActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED,
    onOrders: GET_ORDERS,
};
