import { Receipe } from '../receipe.model';
import { SET_RECEIPES, ReceipeActions, FETCH_RECEIPES, ADD_RECEIPE, UPDATE_RECEIPE, DELETE_RECEIPE, STORE_RECEIPES } from './receipe.action';

export interface receipeState{
    receipes: Receipe[]
}

const initialState = {
    receipes : []
}

export function receipeReducer(state = initialState,action: ReceipeActions) {

    switch (action.type) {
        case SET_RECEIPES:
            return {
                ...state,
                receipes: [...action.payload]
            }
            break;

        case FETCH_RECEIPES:
            case   STORE_RECEIPES:
            return {
                ...state,
            }

        case ADD_RECEIPE:
            let updateReceipes = [...state.receipes];
            updateReceipes.push(action.payload);
            return {
                ...state,
                receipes: updateReceipes
            }

        case UPDATE_RECEIPE: {
            let updateReceipes = [...state.receipes];
            updateReceipes[action.payload.index] = {...action.payload.receipe};
            return {
                ...state,
                receipes: updateReceipes
            }
        }
            

        case DELETE_RECEIPE: {
            let updateReceipes = [...state.receipes];
            updateReceipes.splice(action.payload,1);
            return {
                ...state,
                receipes: updateReceipes
            }
        }

        default:
            return initialState;
    }

}