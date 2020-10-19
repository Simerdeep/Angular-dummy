import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import  { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { LOGIN_REQUEST, LoginRequest, SignInRequest, ClearError } from './store/authActions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: any = null;
  closeSub: Subscription;

  constructor(private authService: AuthService, private router:Router, private compRes: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('auth').subscribe((authData) => {

      this.isLoading = authData.loading
      this.error = authData.autherror;

      if(this.error)
        this.showErrorAlert(authData.autherror);
       
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthenticate() {

    this.isLoading = true;

    let authObs: Observable<any>;

    const { email,password} = this.authForm.value;

    if(this.isLoginMode)
      this.store.dispatch(new LoginRequest({email, password, returnSecureToken:true }));
      // authObs = this.authService.loginUser(this.authForm.value);
    else 
     // authObs = this.authService.signUpUser(this.authForm.value);
     this.store.dispatch(new SignInRequest({email, password, returnSecureToken:true }));
    
     
    // authObs.subscribe((response) => {
    //   console.log(response)
    //   this.isLoading = false;
    //   this.error = null;
    //   this.router.navigate(['/recipes']);
    // },(error) => {
    //   this.error = error;
    //   this.showErrorAlert(error);
    //   this.isLoading = false;
    // });
    
    this.authForm.reset();
  }

  onClose() {
   this.store.dispatch(new ClearError());
  }
  
  showErrorAlert = (message: string) => {

    const alertCmpFac = this.compRes.resolveComponentFactory(AlertComponent);
    const viewConRef = this.alertHost.viewConRef;

    viewConRef.clear();

    const alertRef = viewConRef.createComponent(alertCmpFac);

    alertRef.instance.message = message;
    this.closeSub = alertRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      viewConRef.clear();
    });


  }

}
