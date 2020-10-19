import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor{

  constructor(private authS: AuthService, private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(take(1),
    map(authState => {
      return authState.user
    }),
    exhaustMap((user: any) => {
      if(!user)
        return next.handle(req);

      const modifiedreq = req.clone({ params: new HttpParams().set('auth',user.token)});
      return next.handle(modifiedreq);
    }));
    
  }
}
