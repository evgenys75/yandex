import {
    GET_INGREDIENTS,
    SET_INGREDIENT_DETAILS,
} from '../actions/ingredients';

const initialState = {
    ingredientsFullList: [],
    //ingredientDetails: null,
};

export const ingredientsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, ingredientsFullList: action.data.data};
        }
        case SET_INGREDIENT_DETAILS: {
            return '';
            //return {...state, ingredientDetails: action.data};
        }
        default: {
            return state;
        }
    }
};