import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { dump } from 'pm2';
import { LoginServiceService } from './services/login-service.service';
import { RestaurantService } from './services/restaurant.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-sakafo';
  isLoged : boolean=false ;
  loading = true;
  object : any;
  user : any;
  restaurant :any ;
  rest :any; 
  constructor(private loginServ : LoginServiceService,private router:Router,private roleServ : RoleService,private restaurantServ: RestaurantService) { 
    this.isLoged = this.loginServ.isLogin();
   
    router.events.subscribe((event: RouterEvent) =>
    { this.navigationInterceptor(event) });
    this.roleServ.profile().subscribe(
      (d:any)=>{
         this.object = {
            restaurant : d.restaurant,
            userId : d.userId,
            email :d.email
         } 
         this.restaurantServ.findRestaurant(this.object.restaurant).subscribe( 
          (d:any) =>{
              this. restaurant = d.data;
          },   
          (err:any) => {
          } 
        );
        this.loginServ.findUser(this.object.userId).subscribe( 
          (d:any) =>{
              this.user = d.data;
              console.log(this.user)
          },   
          (err:any) => {
          } 
        );
       
      },
      (err:any) => {
      }
       );
      
   

 
 
  
  }
  navigationInterceptor(event: RouterEvent): void {
     if (event instanceof NavigationStart) { this.loading = true } 
     if (event instanceof NavigationEnd) { this.loading = false }
     if (event instanceof NavigationCancel) { this.loading = false }
     if (event instanceof NavigationError) { this.loading = false }
     }

 deconnecter(){   
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
            location.reload();
        }
}
