 import {User} from "../User.model";
import { AuthActions, LOGIN, LOGOUT, LOGIN_FAILED, LOGIN_REQUEST, SIGNIN_REQUEST, SIGNIN_FAILED, CLEAR_ERROR } from './authActions';
 
 export interface authState{
    user: User,
    autherror: string,
    loading:boolean
 }

 const initialState = {
    user: null,
    autherror: null,
    loading: false
 }

export function authReducer(state = initialState,action: AuthActions) {

   switch (action.type) {
      case LOGIN:

         const user = new User(action.payload.email,action.payload.localId,action.payload.idToken,action.payload.expirationDate);

         return {
               ...state,
               user,
               autherror: null,
               loading:false
         };
         

      case LOGOUT:
      
         return{
            ...state,
            user: null,
            autherror: null
         };

      case LOGIN_REQUEST:
      case SIGNIN_REQUEST:

         return{
            ...state,
            loading:true,
            autherror: null
         };

         case LOGIN_REQUEST:
   
        

      case LOGIN_FAILED:
      case SIGNIN_FAILED:

         return{
            ...state,
            user: null,
            autherror: action.payload,
            loading:false
         };

      case CLEAR_ERROR:

         return{
            ...state,
            autherror: null
         };
   
      default:
         return state;
   }

  
}