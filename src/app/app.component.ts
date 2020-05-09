import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthentificationService} from "./services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public categories;
  public currentCategorie;



  constructor(private catService:CatalogueService , private router:Router, public authService:AuthentificationService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.authService.loadAuthenticatedUserFromLocalStorage();
  }
  title = 'ecom-web';

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log("err");
      })
  }

  getProductByCat(c) {
    this.currentCategorie=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductsDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
