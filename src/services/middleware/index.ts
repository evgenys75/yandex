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

                };

                socket.onerror = (event) => {

                };

                socket.onclose = (event) => {

                };

                socket.onmessage = (event) => {

                };
            }
            next(action);
        };
    }) as Middleware;
};