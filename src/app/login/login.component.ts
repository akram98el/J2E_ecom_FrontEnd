import { Component, OnInit } from '@angular/core';
import{FormControl} from '@angular/forms';
import {User} from "../user";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor(private authService:AuthentificationService, private router:Router)
  { }

  ngOnInit(): void {
  }


  onLogin(dataForm:any) {
    console.log(dataForm.username)
         this.authService.login(dataForm.username,dataForm.password)
         if(this.authService.isAuthenticated){
           this.authService.saveAuthenticatedUser();
           this.router.navigateByUrl('');
         }
  }
}
