import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 form : any | FormGroup;
 error : string = '' ;
  constructor(
    private formbuilder : FormBuilder,
    private loginServ:LoginServiceService, 
    private router : Router)
     {
    
   }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      nom : '',
      prenom :'',
      email:'',
      password:'',
      confirmPassword:'',
      role:'client'
    });
  }
  submit():void{
    try {
      this.loginServ.inscription(this.form.getRawValue());
  
    } 
    catch(err:any){
      this.error = err ;
    }
  }
}
