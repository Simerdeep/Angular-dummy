import { Injectable } from '@angular/core';
import { Receipe } from './receipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { FetchReceipe, SET_RECEIPES } from './store/receipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceipesreolverService implements Resolve<Receipe[]> {

  constructor(private store:Store<AppState>, private action:Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('receipe').pipe(
      take(1),
      map(receipesState => receipesState.receipes),
      switchMap((receipes) => {
        if(receipes.length === 0) {
          this.store.dispatch(new FetchReceipe());

          return this.action.pipe(
            ofType(SET_RECEIPES),
            take(1)
          );
        }
        else {
         return of(receipes)
        }

      })
    )

  }

}
