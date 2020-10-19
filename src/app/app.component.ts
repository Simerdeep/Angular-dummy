import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './shared/logging.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AutoLogin } from './auth/store/authActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ShoopingList';

  constructor(private authS: AuthService, private loggS: LoggingService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AutoLogin());
    this.loggS.printLog("Test from AppComponent")
  }

}
