import {v4} from "uuid";
import {TIngredient} from "../../utils/types";

export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';
export const ADD_INGREDIENT_TO_BURGER: 'ADD_INGREDIENT_TO_BURGER' = 'ADD_INGREDIENT_TO_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER: 'DELETE_INGREDIENT_FROM_BURGER' = 'DELETE_INGREDIENT_FROM_BURGER';
export const CHANGE_POSITION: 'CHANGE_POSITION' = 'CHANGE_POSITION';

export interface IChangePositionAction {
    readonly type: typeof CHANGE_POSITION;
    readonly payload: any;
}

export interface IDeleteIngredientFromBurgerAction {
    readonly type: typeof DELETE_INGREDIENT_FROM_BURGER;
    readonly payload: any;
}

export interface IAddIngredientToBurgerAction {
    readonly type: typeof ADD_INGREDIENT_TO_BURGER;
    readonly payload: any;
}

export type TUserBurgerActions =
    | IChangePositionAction
    | IDeleteIngredientFromBurgerAction
    | IAddIngredientToBurgerAction
    ;

export const addIngredientToBurger = (item: TIngredient) => {
    return {
        type: ADD_INGREDIENT_TO_BURGER,
        payload: {
            ...item,
            uuid: v4()
        }

    }
}