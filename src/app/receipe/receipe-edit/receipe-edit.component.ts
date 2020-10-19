import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Receipe } from '../receipe.model';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map } from 'rxjs/operators';
import { AddReceipe, UpdateReceipe } from '../store/receipe.action';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  receipeForm: FormGroup;

  constructor(private route: ActivatedRoute,  private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) =>{
      console.log(params)
      this.id = +params['id'];
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });

  }

  private initForm() {

    let receipeIngreidents = new FormArray([]);
    let receipeName = "";
    let imagePath = "";
    let description = "";

    if(this.editMode) {

      this.store.select('receipe').pipe(map(receipeState => {
        return receipeState.receipes.find((receipe,index) => {
          return this.id === index;
        })
      })).subscribe((receipe: Receipe) => {

        receipeName = receipe.name;
        imagePath = receipe.imagePath;
        description = receipe.description;

        if(receipe.ingredients.length) {
          receipe.ingredients.map((ingredient: Ingredient) => {
            receipeIngreidents.push(
              new FormGroup({
                'name': new FormControl(ingredient.name,Validators.required),
                'amount': new FormControl(ingredient.amount,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          });
        }
      })
      
    }
    
      

    this.receipeForm = new FormGroup({
      'name': new FormControl(receipeName,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': receipeIngreidents

    });
  }

  onSubmit() {
  
    const { name, imagePath,description,ingredients } = this.receipeForm.value;
    const receipe = new Receipe(name,description,imagePath,ingredients);

    if(this.editMode)
      this.store.dispatch(new UpdateReceipe({index: this.id, receipe}));
    else
      this.store.dispatch(new AddReceipe(receipe));
    
    this.resetForm();
  }

  get controls() { // a getter!
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>(this.receipeForm.get('ingredients'))).push(
      new FormGroup({
        'name': new FormControl("",Validators.required),
        'amount': new FormControl("",[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  resetForm() {
    this.receipeForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  deleteIngredient(index: number) {
    (<FormArray>(this.receipeForm.get('ingredients'))).removeAt(index);
 
  }

}
