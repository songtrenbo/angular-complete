import { ShoppingListService } from '../shopping-list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}
  ingredient: Ingredient;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    this.ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        this.ingredient
      );
    } else {
      this.shoppingListService.addIngredient(this.ingredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
