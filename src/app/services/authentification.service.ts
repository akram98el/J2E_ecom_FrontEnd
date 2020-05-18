import { Injectable } from '@angular/core';
import {forEachComment} from "tslint";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
private users=[
  {username:'admin',password:'1234',roles:['ADMIN','USER']},
  {username:'user',password:'1234',roles:['USER']},
  {username:'user2',password:'1234',roles:['USER']}
]
  public token:string;
  public  isAuthenticated:boolean;
  public userAuthenticated;
  constructor() { }

  public isAdmin() {
    if (this.userAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
      return false;

    }
  }



  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
        this.token=btoa(JSON.stringify(({username:u.username,roles:u.roles})));
      }
    });
    if(user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
    }
    else{
      this.isAuthenticated=false;
      this.userAuthenticated=undefined;
    }

   }
  public saveAuthenticatedUser(){
    if(this.userAuthenticated){
      //btoa(JSON.stringify())
      //this.token car on deja recuperer sa valeur lors de l'authetification
      localStorage.setItem('authToken',this.token);
    }
  }
  public loadAuthenticatedUserFromLocalStorage(){
     let t=localStorage.getItem('authToken');
     // de Json a js pour l'afficher
    if(t) {
      let user = JSON.parse(atob(t));
      console.log(user);
      this.userAuthenticated = {username: user.username, roles: user.roles};
      console.log(this.userAuthenticated);
      this.userAuthenticated = true;
      this.token=t;
    }
  }
  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.token=undefined;
    this.isAuthenticated=false;
    this.userAuthenticated=undefined;
  }

}
