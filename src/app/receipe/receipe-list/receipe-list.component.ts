import { Component, OnInit, OnDestroy } from '@angular/core';
import { Receipe } from '../receipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { receipeState } from '../store/receipe.reducer';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit,OnDestroy {

  receipes: Receipe[] = [];
  receipeChanged: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.receipeChanged = this.store.select('receipe').subscribe((res: receipeState) => {
      this.receipes = res.receipes;
    });
    
  }

  onNewReceipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.receipeChanged.unsubscribe();
  }

}
