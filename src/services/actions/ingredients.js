import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';

export const getIngredientsFullList = () => {
    return dispatch => {
        fetch(`${apiEndPoint}ingredients`).then(checkResponse).then((data) => {
            dispatch({type: GET_INGREDIENTS, data: data});
        }).catch((error) => {
            console.log(error);
        });
    };
};