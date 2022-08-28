import {SET_TOTAL_PRICE, ADD_INGREDIENT_TO_BURGER, DELETE_INGREDIENT_FROM_BURGER,CHANGE_POSITION} from '../actions/user-burger';

const initialState = {
    totalPrice: 0,
    ingredients: {bun: null, filling: []},
};

export const userBurgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_POSITION:{
            console.log('change position');
            return {...state}
        }
        case SET_TOTAL_PRICE: {
            return state;
        }
        case ADD_INGREDIENT_TO_BURGER: {
            const itemId = action.payload.itemId;
            const itemType = action.payload.type;
            if (itemType === 'bun') return {...state, ingredients: {...state.ingredients, bun: itemId}}
            const fillingIngredients = {...state.ingredients};
            if (fillingIngredients.filling.find(el => el.id === itemId.id)) {
                fillingIngredients.filling.find(el => el.id === itemId.id).count++;
            } else {
                fillingIngredients.filling.push(itemId);
            }
            const increasedFiilingIngredients = {...fillingIngredients};
            return {...state, ingredients: {...state.ingredients, filling: increasedFiilingIngredients.filling}};
        }
        case DELETE_INGREDIENT_FROM_BURGER: {
            const itemId = action.payload.itemId;
            const fillingIngredients = {...state.ingredients};
            if (fillingIngredients.filling.find(el => el.id === itemId)) {
                if (fillingIngredients.filling.find(el => el.id === itemId).count === 1) {
                    const deleteIndex = fillingIngredients.filling.findIndex(el => el.id === itemId);
                    fillingIngredients.filling.splice(deleteIndex, 1);
                } else {
                    fillingIngredients.filling.find(el => el.id === itemId).count--;
                }
            }
            const increasedFiilingIngredients = {...fillingIngredients};
            return {...state, ingredients: {...state.ingredients, filling: increasedFiilingIngredients.filling}};
        }
        default: {
            return state;
        }
    }
};