import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Logout } from './store/authActions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;

  constructor(private store: Store) { }

  clearLogoutTimer() {
  
    if(this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
     this.store.dispatch(new Logout());
    },36000000)
  }

}
