import { Component, OnInit, Input } from '@angular/core';
import { Receipe } from '../../receipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input("receipe") receipe: Receipe;
  @Input("index") index: number;

}
