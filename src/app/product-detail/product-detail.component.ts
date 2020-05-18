import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../catalogue.service";
import {Product} from "../model/product.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  currentProduct:Product;
  public products: Object;
  private editPhoto: boolean;

  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private title:string;
  private timestump:number=0;
  private mode:number=0;


  constructor(private  router:Router,private route:ActivatedRoute,private  catalogueService:CatalogueService,
              private Catservice:CatalogueService,private authservice:AuthentificationService) { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params.url);
    this.catalogueService.getProduct(url).subscribe(data=>{
      this.currentProduct=data;
    })
    console.log(url);
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
  onEditProduct(){
    this.mode=1;
  }
  onUpdateProduct(data){

  }



  onProductDetails(p: Product ) {
    let url=btoa(p._links.product.href)
    this.router.navigateByUrl("product-detail/"+
      url);
  }


  onAddProductToCaddy(currentProduct: Product) {

  }
}
