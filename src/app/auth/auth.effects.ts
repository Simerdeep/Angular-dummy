import { Actions, ofType, Effect } from '@ngrx/effects';
import {LOGIN_REQUEST, SIGNIN_REQUEST,LoginRequest, LOGIN, Login, LoginFailed, SignInRequest, LOGOUT, AUTO_LOGIN  } from './store/authActions';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { HttpNetworkService } from '../shared/http-network.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User.model';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {


    handleAuthentication = (resData) => {

        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const { email,localId,idToken} = resData;
        const user = new User(email,localId,idToken,expirationDate);
        localStorage.setItem('userData',JSON.stringify(user));

        return new Login({email,localId,idToken,expirationDate, redirect: true});

    }

    handleError = (error) => {
        let errorMessage = "Error occured";
    
        switch(error.error.error.message) {
        case "EMAIL_EXISTS":
            errorMessage = "Email Id already exist";
            break;
        case "INVALID_PASSWORD":
            errorMessage = "Invalid Password";
            break;
        }

        return  of(new LoginFailed(errorMessage));
    }

    setExpiresInTimer = (resData) => {
        this.authService.setLogoutTimer(+ resData.expiresIn )
    }

    @Effect()
    authSignUp = this.actions.pipe(
        ofType(SIGNIN_REQUEST),
        switchMap((authData: SignInRequest) => {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`
            return this.hN.postData(url,authData.payload).pipe(
                tap(this.setExpiresInTimer),
                map(this.handleAuthentication),
                catchError(this.handleError)
            );

        }),
    );

    @Effect()
    authLogin = this.actions.pipe(
        ofType(LOGIN_REQUEST),
        switchMap((authData: LoginRequest) => {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`
            return this.hN.postData(url,authData.payload).pipe(
                tap(this.setExpiresInTimer),
                map(this.handleAuthentication),
                catchError(this.handleError)
                
            );

        }),
    );

    @Effect({dispatch: false})
    authRedirect = this.actions.pipe(ofType(LOGIN),tap((authActionSuccess: Login) => {
        if(authActionSuccess.payload.redirect)
            this.router.navigate(['/']);
    }))

    @Effect({dispatch: false})
    authLogout = this.actions.pipe(ofType(LOGOUT),tap(() => {
        localStorage.clear();
        this.authService.clearLogoutTimer();
        this.router.navigate(['/auth']);
    }))


    @Effect()
    autoLogin = this.actions.pipe(ofType(AUTO_LOGIN),map(() => {
        const userData: any = JSON.parse(localStorage.getItem('userData'));
        if(userData) {
          const { email,id, _token } = userData;
          const loadedUser = new User(email, id, _token, new Date(userData._tokenExpirationDate));
          if(loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            const resData = {
                expiresIn: expirationDuration
            };
            this.setExpiresInTimer(resData);
            return(new Login({email: loadedUser.email, localId: loadedUser.id, idToken: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false  }))
          }
          return { type: "DUMMY"}
        }
        return { type: "DUMMY"}
    }));


    constructor(private actions: Actions, private hN: HttpNetworkService, private router: Router, private authService: AuthService) {
        
    }
}