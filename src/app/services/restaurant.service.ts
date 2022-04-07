import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { dump } from 'pm2';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) 
  { 
  }
  findRestaurant(id:any) {
    return this.http.get(environment.apiURL + 'restaurant/find/'+id,{withCredentials:true});
  }
}
