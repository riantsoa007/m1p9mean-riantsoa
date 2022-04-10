import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { RoleService } from '../services/role.service';

@Injectable({
    providedIn: 'root'
})

export class DeconnectionGuard implements CanActivate {

    constructor(private loginServ : LoginServiceService,private router:Router,private roleServ :RoleService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.loginServ.isLogin()==false) {
          return true;
      }
      else {
            this.roleServ.redirect();
      }
      return false;
    }

}