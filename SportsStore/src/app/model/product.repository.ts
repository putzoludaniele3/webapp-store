import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository{

    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: StaticDataSource){
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            //funzione importante, prende un attributo dal modello (categoria) 
            //e raggruppa i valori di ciascun prodotto
            this.categories = data.map(p => p.category ?? "(None)")
                .filter((c, index, array) => array.indexOf(c) == index).sort();
                /*
                - Il risultato di questo map sarà un nuovo array che contiene tutte le categorie
                - filter rimuove i duplicati dall'array:
                    - Il metodo indexOf() restituisce l'indice della prima occorrenza dell'elemento c nell'array. Se l'elemento 'c' è già presente più volte nell'array, indexOf() ti dà l'indice della prima volta in cui appare
                    - index: Questo è l'indice corrente dell'elemento durante l'iterazione con filter. È il numero che indica la posizione attuale dell'elemento mentre filter scorre l'array.
                */
        });

    }

    getProducts(category?: string): Product[]{
        return this.products
            .filter(p => category == undefined || category == p.category);
    }

    getProduct(id: number): Product | undefined {
        return this.products.find(p => p.id == id);
    }
    
    getCategories(): string[] {
        return this.categories;
    }
}