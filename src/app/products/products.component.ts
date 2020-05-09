import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 public products: Object;
  private editPhoto: boolean;
  private currentProduct: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private title:string;
  private timestump:number=0;

  constructor(private Catservice:CatalogueService ,
              private route:ActivatedRoute ,private router:Router,public  authservice:AuthentificationService)
  {  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {    //quant je click je navigue d'une route a une autre//je recupère le url
        let url = val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;

        if(p1==1)
        { this.title="Selection";
          this.getProducts('/products/search/selectedproducts');}
//si p1=2 je cherche les produit par categorie
        else if (p1==2){

          let idCat=this.route.snapshot.params.p2;
          this.title="Produit de categorie"+idCat;
          this.getProducts('/categories/'+idCat+'/products');
        }
        else if (p1==3){
          this.title="Produit en Promotion";

          this.getProducts('/products/search/promoProducts');
        }
        else if (p1==4){
          this.title="Produit Disponibles";

          this.getProducts('/products/search/dispoProducts');
        }
        else if (p1==5){
          this.title="Recherche..";
          let idCat=this.route.snapshot.params.p2;
          this.getProducts('/products/search/dispoProducts');
        }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if(p1==1)
    {this.getProducts('/products/search/selectedproducts');}


  }

  public isAdmin(){
    return this.authservice.isAdmin();
  }


  private getProducts(url) {
    this.Catservice.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log("err");
      })
  }

  OnEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true
  }

  OnSelectedFile(event) {
this.selectedFiles =event.target.files;
  }

  uploadPhoto() {
    this.progress= 0;
    //selectedfiles contiens tous les produits selectionés 0 c'est a d le premier selectioner
    this.currentFileUpload = this.selectedFiles.item(0)
    this.Catservice.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
      this.timestump=Date.now();

      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  getTS() {
    return this.timestump;
  }

  onAddProductToCaddy(p: any) {
    
  }

  onProductDetails(p: any) {
    
  }
}
