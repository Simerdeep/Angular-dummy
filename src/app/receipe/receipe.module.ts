import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { RecipeItemComponent } from './receipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ReceipeComponent } from './receipe.component';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipe-edit/receipe-edit.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceipeRoutingModule } from './receipe-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ 
    ReceipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ReceipeComponent,
    ReceipeStartComponent,
    ReceipeEditComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    ReceipeRoutingModule
  ]
})
export class ReceipeModule { }
