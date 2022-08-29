import {
    SET_TOTAL_PRICE,
    ADD_INGREDIENT_TO_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    CHANGE_POSITION,
} from '../actions/user-burger';
import { v4 as uuidv4 } from "uuid";

const initialState = {
    totalPrice: 0,
    ingredients: {bun: null, filling: []},
};

export const userBurgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_POSITION: {
            const fillingIngredients = {...state.ingredients};
            const chnagedPositionFiilingIngredients = {...fillingIngredients};
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    filling: chnagedPositionFiilingIngredients.filling.sort(
                        () => .5 - Math.random()),
                },
            };
        }
        case SET_TOTAL_PRICE: {
            return state;
        }
        case ADD_INGREDIENT_TO_BURGER: {
            const itemId = action.payload.itemId;
            const itemType = action.payload.type;
            const uuid = uuidv4();
            itemId.uuid = uuid;
            if (itemType === 'bun') return {
                ...state,
                ingredients: {...state.ingredients, bun: itemId},
            };
            const fillingIngredients = {...state.ingredients};
            fillingIngredients.filling.push(itemId);
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