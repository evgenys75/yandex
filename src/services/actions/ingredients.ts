import {apiEndPoint} from '../../utils/data';
import {checkResponse} from '../../utils/utils'

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export interface IGetIngredientsAction {
    readonly type: typeof INGREDIENTS_REQUEST;
}
export const getIngredientsAction = (): IGetIngredientsAction => ({
    type: INGREDIENTS_REQUEST
});
export const getIngredientsFullList: any = () => (dispatch: any) => {
    dispatch(getIngredientsAction());
    fetch(`${apiEndPoint}ingredients`).then(checkResponse).then((data) => {
        dispatch({type: GET_INGREDIENTS, data: data});
    }).catch((error) => {
        console.log(error);
    });

}