import { Component } from "@angular/core";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent{

    selectedCategory: string | undefined;
    productsPerPage = 4;
    selectedPage = 1;

    constructor(private repository: ProductRepository){}

    get products(): Product[]{
        
        return this.repository.getProducts(this.selectedCategory);
    }

    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string){
        this.selectedCategory = newCategory;
    }
}