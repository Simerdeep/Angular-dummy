import { Ingredient } from '../../shared/Ingredient.model';
import { Action } from '@ngrx/store';
import * as shoppingListActions from './shopping-list.actions';

export interface shoppingState {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState = {
    ingredients: [
        new Ingredient("Kitchen King", 10),
        new Ingredient("Jeera", 20),
        new Ingredient("Dal Chini", 30)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState,action: shoppingListActions.ShoppigListActions) {

    switch(action.type) {
        case shoppingListActions.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case shoppingListActions.ADD_INGREDIENTS :
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case shoppingListActions.UPDATE_INGREDIENT :

            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngriedent = {
                ...ingredient,
                ...action.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngriedent;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }

        case shoppingListActions.DELETE_INGREDIENT :

            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {return index !== state.editedIngredientIndex} ),
                editedIngredientIndex: -1,
                editedIngredient: null
            }

        case shoppingListActions.STOP_EDIT_INGREDIENT :

            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }

        case shoppingListActions.START_EDIT_INGREDIENT :

            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        default: 
            return initialState;
    }


}