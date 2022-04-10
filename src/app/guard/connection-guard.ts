import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
@Injectable({
    providedIn: 'root'
})
export class ConnectionGuard implements CanActivate {

    constructor(private loginServ : LoginServiceService,private router:Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.loginServ.isLogin()) {
          return true;
      }
      else {
            this.router.navigate(['/login'],{
                queryParams :{
                    return :state.url 
                }
            }
            );
      }
      return false;
    }

}
