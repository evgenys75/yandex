import {apiEndPoint} from '../../utils/data';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';

async function checkResponse(res) {
    return res.ok ? await res.json() : Promise.reject(
        `res.ok: ${res.ok}, res.status: ${res.status}`);
}

export const getIngredientsFullList = () => {
    return dispatch => {
        fetch(`${apiEndPoint}ingredients`).then(checkResponse).then((data) => {
            dispatch({type: GET_INGREDIENTS, data: data});
        }).catch((error) => {
            console.log(error);
        });
    };
};