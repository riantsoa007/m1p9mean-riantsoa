import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : any | FormGroup;
  constructor(  private formbuilder : FormBuilder,
    private loginServ: LoginServiceService ,
    private router:Router,
    private roleServ : RoleService) { }
  error : any;
  
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:'',
      password:'',
    });
  }
  submit():void {
    this.loginServ.seConnecter(this.form.getRawValue()).subscribe(
      (d:any)=>{
         localStorage.setItem('token', d.token);
         this.roleServ.redirect();
      },
      (err:any) => {
        this.error =err.error.message;
        
      }
    );
  }
  
}
