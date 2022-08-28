import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { userBurgerReducer } from './user-burger-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    userBurger: userBurgerReducer,
    order: orderReducer
});