import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient,private router : Router) { }

  redirect():void{
    this.http.get(environment.apiURL + 'user/profile',{withCredentials:true}).subscribe(
      ((res:any)=>{
          this.router.navigate(['/'+res.role]);
      })
    );
  }
  profile(){
   
    return this.http.get(environment.apiURL + 'user/profile',{withCredentials:true});    
  }
}
