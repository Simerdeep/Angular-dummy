import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from '../auth/authinterceptor.service';
import { LoggingService } from '../shared/logging.service';



@NgModule({
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthinterceptorService, multi: true}, LoggingService],

  imports: [
    CommonModule
  ]
})
export class CoreModule { }
