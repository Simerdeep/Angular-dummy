import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../shared/logging.service';
import { Store } from '@ngrx/store';
import { StartEdit } from './store/shopping-list.actions';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor( private loggS: LoggingService, private appStore: Store<AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.appStore.select('shoppingList');
    this.loggS.printLog("Test from ShoppingComponent")

  }

  ngOnDestroy() {
    
  }

  onEditItemClick(index: number) {
    this.appStore.dispatch(new StartEdit(index));
  }

}
