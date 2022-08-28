import {apiEndPoint} from '../../utils/data';

export const CREATE_ORDER = 'CREATE_ORDER';

export const sendOrder = (orderRequest) => {
    return dispatch => {
        fetch(`${apiEndPoint}orders`,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: orderRequest
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't get ingredients");
            }
        }).then((data) => {
            dispatch({type: CREATE_ORDER, data: data.order});
        }).catch((error) => {
            console.log(error);
        })
    }
}