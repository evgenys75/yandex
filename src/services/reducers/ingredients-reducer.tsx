import {
    GET_INGREDIENTS,
    SET_INGREDIENT_DETAILS,
    TIngredientsActions
} from '../actions/ingredients';
import {TIngredient} from '../../utils/types';

export type TIngredientState = {
    ingredientsFullList: Array<TIngredient>,
    ingredientDetails: any
};

const initialState: TIngredientState = {
    ingredientsFullList: [],
    ingredientDetails: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientState => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, ingredientsFullList: action.data.data};
        }
        case SET_INGREDIENT_DETAILS: {
            return state;
            //return {...state, ingredientDetails: action.data};
        }
        default: {
            return state;
        }
    }
};