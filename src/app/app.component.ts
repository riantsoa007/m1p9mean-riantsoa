import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { LoginServiceService } from './services/login-service.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-sakafo';
  isLoged : boolean=false ;
  loading = true
  user : any;
  constructor(private loginServ : LoginServiceService,private router:Router,private roleServ : RoleService) { 
    this.isLoged = this.loginServ.isLogin();
    router.events.subscribe((event: RouterEvent) =>
    { this.navigationInterceptor(event) });
   // this.user = roleServ.profile();
   console.log(roleServ.profile());

  }
  navigationInterceptor(event: RouterEvent): void {
     if (event instanceof NavigationStart) { this.loading = true } 
     if (event instanceof NavigationEnd) { this.loading = false }
     if (event instanceof NavigationCancel) { this.loading = false }
     if (event instanceof NavigationError) { this.loading = false }
     }

//  deconnecter(){
//     this.loginServ.seDeconnecter().subscribe (
//       (d)=>{
//         let result : Result = d as Result;
//         if(result["meta"]["status"] == 200){
        
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             this.route.navigate(['login']);
//             location.reload();
//         }
//         else {
        
//         }
//       },
//       (err)=> {
        
//       }
//       );
   
//  }
}
