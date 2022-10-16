import type {Middleware, MiddlewareAPI} from "redux";
import type {AppDispatch, RootState} from "../types";
import {
    TWSOrderActions
} from "../actions/feed";

export const socketMiddleware = (
    wsUrl: string,
    wsActions: TWSOrderActions,
): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, onOpen, onClose, onError, onOrders} = wsActions;

            if (type === wsInit) {
                wsUrl = payload;
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onOrders, payload: parsedData });
                };
            }
            next(action);
        };
    }) as Middleware;
};