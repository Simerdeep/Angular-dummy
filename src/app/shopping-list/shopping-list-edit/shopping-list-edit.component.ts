import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Ingredient} from "../../shared/Ingredient.model";
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('f') shoppingFormControl: NgForm;
  isEditMode: boolean  = false;

  constructor(private appStore: Store<AppState>) { }

  ngOnInit(): void {

    this.appStore.select('shoppingList').subscribe((stateData) => {
      if(stateData.editedIngredientIndex > -1) {
        this.isEditMode = true;
        const ingredient = stateData.editedIngredient;
        const { name,amount} = ingredient;

        this.shoppingFormControl.setValue({
          name ,
          amount
        });
      }
      else 
        this.isEditMode = false;
    });
  }

  addIngredient() {


    const ingredient = new Ingredient(this.shoppingFormControl.value.name,this.shoppingFormControl.value.amount);

    if(this.isEditMode) {
      this.appStore.dispatch(
        new shoppingListActions.UpdateIngredient(ingredient)
      )
      this.isEditMode = false;
    }
    else  {
      this.appStore.dispatch(
        new shoppingListActions.AddIngredient(ingredient)
      )
    }
      


    this.shoppingFormControl.reset();
    
  }

  onClear () {
    this.shoppingFormControl.reset();
    this.isEditMode = false;
    this.appStore.dispatch(new shoppingListActions.StopEdit());
  }

  OnDelete() {
    this.appStore.dispatch(
      new shoppingListActions.DeleteIngredient()
    )
      this.onClear();
  }

}
