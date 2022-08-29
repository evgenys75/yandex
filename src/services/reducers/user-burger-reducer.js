import {
    SET_TOTAL_PRICE,
    ADD_INGREDIENT_TO_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    CHANGE_POSITION,
} from '../actions/user-burger';

const initialState = {
    totalPrice: 0,
    ingredients: {bun: null, filling: []},
};

export const userBurgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_POSITION: {

            const from = state.ingredients.filling.findIndex(
                el => el.uuid === action.payload.from);
            const to = state.ingredients.filling.findIndex(
                el => el.uuid === action.payload.to);
            const tempElement = state.ingredients.filling[from];
            state.ingredients.filling[from] = state.ingredients.filling[to];
            state.ingredients.filling[to] = tempElement;
            const chnagedPositionFiilingIngredients = {...state.ingredients};
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    filling: chnagedPositionFiilingIngredients.filling,
                },
            };
        }
        case SET_TOTAL_PRICE: {
            return state;
        }
        case ADD_INGREDIENT_TO_BURGER: {
            const item = action.payload;
            const itemType = action.payload.type;
            if (itemType === 'bun') return {
                ...state,
                ingredients: {...state.ingredients, bun: item},
            };
            const fillingIngredients = {...state.ingredients};
            fillingIngredients.filling.push(item);
            const increasedFiilingIngredients = {...fillingIngredients};
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    filling: increasedFiilingIngredients.filling,
                },
            };
        }
        case DELETE_INGREDIENT_FROM_BURGER: {
            const itemId = action.payload.itemId;
            const fillingIngredients = {...state.ingredients};
            const deleteIndex = fillingIngredients.filling.findIndex(
                el => el.uuid === itemId);
            fillingIngredients.filling.splice(deleteIndex, 1);
            const increasedFiilingIngredients = {...fillingIngredients};
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    filling: increasedFiilingIngredients.filling,
                },
            };
        }
        default: {
            return state;
        }
    }
};