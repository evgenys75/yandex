import {apiEndPoint} from '../../utils/data';


export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';

export const getIngredientsFullList = () => {
    return dispatch => {
        fetch(`${apiEndPoint}ingredients`).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't get ingredients");
            }
        }).then((data) => {
            dispatch({type: GET_INGREDIENTS, data: data});
        }).catch((error) => {
            console.log(error);
        })
    }
}