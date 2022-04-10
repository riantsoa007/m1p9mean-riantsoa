import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreurComponent } from './components/livreur/livreur.component';
import {LoginComponent} from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { RestaurantComponent } from './components/restaurant/restaurant/restaurant.component';
import { ConnectionGuard } from './guard/connection-guard';
import { DeconnectionGuard } from './guard/deconnection-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
 },
    { path: 'login',
      component: LoginComponent,
      canActivate : [DeconnectionGuard]
   },
  {
     path: 'register', 
     component: RegisterComponent ,
     canActivate : [DeconnectionGuard]
     },
  { path: 'livreur', component: LivreurComponent,
  canActivate : [ConnectionGuard] },
  { path: 'restaurant',
   component: RestaurantComponent,
   canActivate : [ConnectionGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
