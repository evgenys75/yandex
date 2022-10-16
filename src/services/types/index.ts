import {store} from '../store';
import {Action, ActionCreator, Dispatch} from 'redux';
import {TIngredientWithUniqueId, TIngredient, TOrder} from '../../utils/types';
import {TShopsActions} from '../actions/feed';

type TApplicationActions = TShopsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TApplicationActions>;