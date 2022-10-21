import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'
import {AppDispatch} from '../../services/types';
import {AppThunk} from "../types/index";


export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';

export interface IGetIngredientsRequestAction {
    readonly type: typeof INGREDIENTS_REQUEST;
}
export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
    readonly data: any;
}

export interface ISetIngredientDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
}

export type TIngredientsActions =
    | ISetIngredientDetailsAction
    | IGetIngredientsAction
    | IGetIngredientsRequestAction
    ;

export const getIngredientsAction = (): IGetIngredientsRequestAction => ({
    type: INGREDIENTS_REQUEST
});
export const getIngredientsFullList: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsAction());
    fetch(`${apiEndPoint}ingredients`).then(checkResponse).then((data) => {
        dispatch({type: GET_INGREDIENTS, data: data});
    }).catch((error) => {
        console.log(error);
    });

}