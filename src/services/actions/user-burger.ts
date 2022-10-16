import {v4} from "uuid";

export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';
export const ADD_INGREDIENT_TO_BURGER: 'ADD_INGREDIENT_TO_BURGER' = 'ADD_INGREDIENT_TO_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER: 'DELETE_INGREDIENT_FROM_BURGER' = 'DELETE_INGREDIENT_FROM_BURGER';
export const CHANGE_POSITION: 'CHANGE_POSITION' = 'CHANGE_POSITION';

export const addIngredientToBurger = (item:any) => {
    return {
        type: ADD_INGREDIENT_TO_BURGER,
        payload: {
            ...item,
            uuid: v4()
        }

    }
}