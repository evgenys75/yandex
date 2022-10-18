import {store} from '../store';
import {Action, ActionCreator, AnyAction, Dispatch} from 'redux';
import {TIngredientWithUniqueId, TIngredient, TOrder} from '../../utils/types';
import { ThunkAction } from 'redux-thunk';
import {TShopsActions} from '../actions/feed';
import { TAuthActions } from '../actions/user';

type TApplicationActions = TShopsActions | TAuthActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = Dispatch<AnyAction>;


export type AppDispatch = Dispatch<AnyAction>;