import {store} from '../store';
import {Action, ActionCreator, AnyAction, Dispatch} from 'redux';
import {TIngredientWithUniqueId, TIngredient, TOrder} from '../../utils/types';
import {ThunkAction} from 'redux-thunk';
import {TFeedActions} from '../actions/feed';
import {TAuthActions} from '../actions/user';
import {TUserBurgerActions} from "../actions/user-burger";
import {TUserActions} from "../actions/user";
import {TOrderActions} from "../actions/order";
import {TIngredientsActions} from "../actions/ingredients";

type TApplicationActions =
    TFeedActions
    | TAuthActions
    | TUserBurgerActions
    | TIngredientsActions
    | TOrderActions
    | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
export type AppDispatch = typeof store.dispatch;