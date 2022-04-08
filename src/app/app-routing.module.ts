import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreurComponent } from './components/livreur/livreur.component';
import {LoginComponent} from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'livreur', component: LivreurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
