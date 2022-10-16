import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients-reducer';
import {userBurgerReducer} from './user-burger-reducer';
import {orderReducer} from './order-reducer';
import {userReducer} from './user-reducer';
import {feedReducer} from './feed-reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    userBurger: userBurgerReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer
});