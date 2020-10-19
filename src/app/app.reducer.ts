import * as shoppinglist  from "./shopping-list/store/shopping-list.reducer";
import * as auth  from "./auth/store/authReducer";
import { ActionReducerMap } from '@ngrx/store';
import { receipeReducer, receipeState } from './receipe/store/receipe.reducer';

export interface AppState {
    shoppingList: shoppinglist.shoppingState,
    auth: auth.authState,
    receipe: receipeState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppinglist.shoppingListReducer,
    auth: auth.authReducer,
    receipe: receipeReducer
}