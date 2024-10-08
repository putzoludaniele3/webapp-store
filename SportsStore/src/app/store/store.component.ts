import { Component } from "@angular/core";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";
import { Cart } from "../model/cart.model";
import { Route, Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent{

    selectedCategory: string | undefined;
    productsPerPage = 4;
    selectedPage = 1;

    constructor(private repository: ProductRepository,
        private cart: Cart,
        private router: Router
    ){}

    get products(): Product[]{
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage)
            //slice: prende una porzione di valori dell array,
            //in questo caso slice ha (indice di partenza, indice finale)
    }

    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string){
        this.selectedCategory = newCategory;
    }

    changePage(newPage : number){
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number){
        this.productsPerPage= Number(newSize);
        this.changePage(1);
    }

    /*
    //ottima funzione per paginazione da studiarsi e tenersi a mente!
    get pageNumbers(): number[]{
        return Array(Math.ceil(this.repository
            //math.ceil arrotonda il valore che gli passi per eccesso (se e 2.2 lo arrotonda per 3)
            .getProducts(this.selectedCategory).length / this.productsPerPage))
                //qui conta quanti prodotti ci sono in totale e divide il numero con il numero di prodotti che vuoi vedere x pagina
                //es: se ho 16 prodotti e voglio vederne 8, restituira 2 (che sono le pagine in cui voglio vedere i prodotti)
                //es: se ho 17 prodotti e voglio vederne 8, restituira 3 (perche arrotonda per eccesso)
                // fino ad ora : crea un array, la lunghezza del array e il numero di pagine necessarie per farti vedere i prodotti
                .fill(0).map((x, i) => i + 1);
                //infine: ogni elemento dell array é 0,
                //Piccolo incipit su funzione map: quando chiami la map, tutto cio che metti dopo la fat arrow é cio con cui andra a riempire ogni elemtno dell array
                //quindi andra a riempire l array che ora é [0, 0, 0] con indice(posizione mentre scorre array (inizialmente 0), con 0+1)
                //risultato finale: esce un array contenente i numeri di pagina, da poter visualizzare nel DOM per scegliere quale pagina mostrare 
    }
    */

    get pageCount(): number {
        return Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    addProductToCart(product: Product){
        this.cart.addLine(product)
        this.router.navigateByUrl("/cart")
    }

}