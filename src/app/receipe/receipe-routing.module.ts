import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ReceipeComponent } from './receipe.component';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipe-edit/receipe-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReceipesreolverService } from './receipesreolver.service';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        component: ReceipeComponent,
        canActivate: [AuthGuard],
        children: [{
          path: '',
          component: ReceipeStartComponent
        },{
          path: 'new',
          component: ReceipeEditComponent
        },{
          path: ':id',
          component: RecipeDetailComponent
        },{
          path: ':id/edit',
          component: ReceipeEditComponent
        }]
      },
]

@NgModule({
  
  imports: [
   RouterModule.forChild(routes)
  ],
  exports:[
   RouterModule
  ]
})
export class ReceipeRoutingModule { }
