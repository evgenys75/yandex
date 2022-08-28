import {apiEndPoint} from '../../utils/data';

export const CREATE_ORDER = 'CREATE_ORDER';

async function checkResponse(res) {
    return res.ok ? await res.json() : Promise.reject(
        `res.ok: ${res.ok}, res.status: ${res.status}`);
}

export const sendOrder = (orderRequest) => {
    return dispatch => {
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