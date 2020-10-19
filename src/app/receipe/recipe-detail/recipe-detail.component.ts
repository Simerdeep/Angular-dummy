import { Component, OnInit, Input } from '@angular/core';
import { Receipe } from '../receipe.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { DeleteReceipe } from '../store/receipe.action';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 selectedReceipe: Receipe =  new Receipe("","","",[]);
 id: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.route.params.pipe(map ((params: Params) =>{ return +params['id'] }),
    switchMap(id => {
      this.id = id;
      return this.store.select('receipe');
    }),
    map((receipeState ) => {
      return receipeState.receipes.find((receipe,index) => {
        return this.id === index;
      })
    })
    ).subscribe((receipe: Receipe) => {
        console.log(receipe)
        this.selectedReceipe = receipe;
    })

  }

  goToShoppingList() {
    this.store.dispatch(new AddIngredients(this.selectedReceipe.ingredients) );
    this.router.navigate(['shoppinglist']);
  }

  deleteReceipe() {
    this.store.dispatch(new DeleteReceipe(this.id));
    this.router.navigate(["/recipes"])
  }

}
