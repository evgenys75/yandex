import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'


export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';
export const sendOrder = (orderRequest:string) => {
    return (dispatch:any) => {
        fetch(`${apiEndPoint}orders`, {
            headers: {
                'Content-Type': 'application/json',
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