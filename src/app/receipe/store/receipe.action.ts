import { Action } from '@ngrx/store';
import { Receipe } from '../receipe.model';


export const SET_RECEIPES = 'SET_RECEIPES';
export const FETCH_RECEIPES = 'FETCH_RECEIPES';
export const ADD_RECEIPE = 'ADD_RECEIPE';
export const UPDATE_RECEIPE = 'UPDATE_RECEIPE';
export const DELETE_RECEIPE = 'DELETE_RECEIPE';
export const STORE_RECEIPES = 'STORE_RECEIPES';

export class SetReceipe implements Action {
    readonly type = SET_RECEIPES;
    constructor(public payload : Receipe[]) {

    }
}

export class FetchReceipe implements Action {
    readonly type = FETCH_RECEIPES;
}

export class AddReceipe implements Action {
    readonly type = ADD_RECEIPE;
    constructor(public payload : Receipe) {

    }
}

export class UpdateReceipe implements Action {
    readonly type = UPDATE_RECEIPE;
    constructor(public payload : {index: number, receipe: Receipe}) {

    }
}

export class DeleteReceipe implements Action {
    readonly type = DELETE_RECEIPE;
    constructor(public payload : number) {

    }
}

export class StoreReceipe implements Action {
    readonly type = STORE_RECEIPES;
}

export type ReceipeActions = SetReceipe | FetchReceipe | AddReceipe | UpdateReceipe | DeleteReceipe | StoreReceipe