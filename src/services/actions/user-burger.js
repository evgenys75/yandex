import {v4 as uuidv4} from "uuid";

export const SET_TOTAL_PRICE = 'SET_TOTALPRICE';
export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER = 'DELETE_INGREDIENT_FROM_BURGER';
export const CHANGE_POSITION = 'CHANGE_POSITION';

export const addIngredientToBurger = (item) => {
    return {
        type: ADD_INGREDIENT_TO_BURGER,
        payload: {
            ...item,
            uuid: uuidv4()
        }

    }
}