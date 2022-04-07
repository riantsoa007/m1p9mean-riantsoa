import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient,private router:Router) { }

  seConnecter(input: any) {
    return this.http.post(environment.apiURL + 'user/login', input, {withCredentials:true} );
  }
  logout() {
    localStorage.removeItem("token");
  }
  findUser(id:any) {
    return this.http.get(environment.apiURL + 'user/find/'+id,{withCredentials:true});
  }
 
 inscription(input: any) {
   if(input.password != input.confirmPassword){
    throw new Error( "Les mots de passe ne correspondent pas !");
   }
    return this.http.post(environment.apiURL + 'user/signup', input).subscribe(
      res=>{
      this.router.navigate(['/login']);
    },(err)=>{
      throw new Error(err.message);
    });
    
  }
  // seDeconnecter() {
  //   return this.http.delete((environment.apiURL + '/deconnection');
  // }
  isLogin() {
    if (localStorage.getItem("token") == null) {
      return false;
    }
    return true;
  }
}
