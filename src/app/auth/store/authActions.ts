import { Action } from '@ngrx/store';

export const LOGIN = "LOGIN";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const LOGOUT = "LOGOUT";

export const CLEAR_ERROR = "CLEAR_ERROR";
export const AUTO_LOGIN = "AUTO_LOGIN";

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload : { email: string,localId: string,idToken: string,expirationDate: Date, redirect: boolean}) {

    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
    
}

export class LoginRequest implements Action {
    readonly type = LOGIN_REQUEST;
    constructor(public payload : { email: string,password: string,returnSecureToken: boolean}) {

    }
}

export class SignInRequest implements Action {
    readonly type = SIGNIN_REQUEST;
    constructor(public payload : { email: string,password: string,returnSecureToken: boolean}) {

    }
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload : string) {

    }
}

export class SignInFailed implements Action {
    readonly type = SIGNIN_FAILED;
    constructor(public payload : string) {

    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = Login | Logout | LoginRequest |LoginFailed | SignInRequest 
                            | SignInFailed | ClearError | AutoLogin