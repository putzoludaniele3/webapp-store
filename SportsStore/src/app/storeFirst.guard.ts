import { Injectable } from "@angular/core";
import {
ActivatedRouteSnapshot, RouterStateSnapshot,
Router
} from "@angular/router";
import { StoreComponent } from "./store/store.component";

//questo guard permette di cambiare route solo se passi da store
//se sei in un altro route e ricarichi la pagina, torni direttamente indietro nello store
@Injectable()
export class StoreFirstGuard {
    private firstNavigation = true;
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != StoreComponent) {
                this.router.navigateByUrl("/");
                return false;
            }
        }
        return true;
    }
}