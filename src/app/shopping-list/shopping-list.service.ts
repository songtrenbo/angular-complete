import {Ingredient} from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class ShoppingListService{
    ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
    ];
    getIngredients(){
        return this.ingredients;
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}