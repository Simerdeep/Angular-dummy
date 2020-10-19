import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { FETCH_RECEIPES, SetReceipe, STORE_RECEIPES } from "./receipe.action";
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpNetworkService } from 'src/app/shared/http-network.service';
import { Receipe } from '../receipe.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class ReceipeEffects {

    @Effect()
    fetchReceipe = this.actions.pipe(
        ofType(FETCH_RECEIPES),
        switchMap(() => {
            const url = "https://angular-learn-3dcb4.firebaseio.com/receipes.json";
            return this.httpSe.getData(url)
        }),
        map( (receipes : any) => {
            return receipes.map( (receipe: Receipe) =>
              {
                return {
                  ...receipe,
                  ingredients: receipe.ingredients ? receipe.ingredients : []
                }
              }
      
            );
          }
        ),
        map((receipe) => {
            return new SetReceipe(receipe);
        })
    )

    @Effect({dispatch: false})
    storeReceipe = this.actions.pipe(
        ofType(STORE_RECEIPES),
        withLatestFrom(this.store.select('receipe')),
        switchMap(([actiondata,receipeState]) => {
            const url = "https://angular-learn-3dcb4.firebaseio.com/receipes.json";
            return this.httpSe.putData(url, receipeState.receipes)
        })
       
    )

    constructor(private actions: Actions, private httpSe: HttpNetworkService, private store: Store<AppState>) {}


}
