import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'
import {getCookie} from '../../utils/utils';
import {AppDispatch} from '../../services/types';

export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';

export interface ICreateOrderAction {
    readonly type: typeof CREATE_ORDER;
    readonly data: any;
}

export type TOrderActions =
    | ICreateOrderAction
    ;

export const sendOrder = (orderRequest: string) => {
    return (dispatch: AppDispatch) => {
        fetch(`${apiEndPoint}orders`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`
            },
            method: 'POST',
            body: orderRequest,
        }).then(checkResponse).then((data) => {
            dispatch({type: CREATE_ORDER, data: data.order});
        }).catch((error) => {
            console.log(error);
        });
    };
};