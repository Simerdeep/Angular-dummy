import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ShortenPipe } from './shared/shorten.pipe';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { appReducer } from './app.reducer';
import { AuthEffects } from './auth/auth.effects';
import { environment } from 'src/environments/environment';
import { ReceipeEffects } from './receipe/store/receipe.effects';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, ReceipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
