import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Logout } from '../auth/store/authActions';
import { FetchReceipe, StoreReceipe } from '../receipe/store/receipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

   this.userSub =  this.store.select('auth').subscribe((authState) => {

      this.isAuthenticated = authState.user ? true : false;
    
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



  saveReceipeData() {
    this.store.dispatch(new StoreReceipe());
  }

  getReceipeData() {
    this.store.dispatch(new FetchReceipe());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
