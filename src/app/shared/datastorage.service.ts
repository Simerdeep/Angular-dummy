import { Injectable } from '@angular/core';
import { HttpNetworkService } from './http-network.service';
import { Receipe } from '../receipe/receipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetReceipe } from '../receipe/store/receipe.action';
@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private hN: HttpNetworkService, private authService: AuthService, private store: Store<AppState>) { 

  }

  fetchReceipeData() {
    const url = "https://angular-learn-3dcb4.firebaseio.com/receipes.json";

    return this.hN.getData(url).pipe(map( (receipes : any) => {
      return receipes.map( (receipe: Receipe) =>
        {
          return {
            ...receipe,
            ingredients: receipe.ingredients ? receipe.ingredients : []
          }
        }

      );
    }
  ),tap((receipes: any) => this.store.dispatch(new SetReceipe(receipes))))

   
  }

}
