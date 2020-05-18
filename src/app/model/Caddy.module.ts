import {ItemProduct} from "./ItemProduct.modul";
import {Client} from "./Client.model";


export class  Caddy{
  constructor(name:string){this.name=name;}
  public name:string;
  public items:Map<number,ItemProduct> =new Map();
  public client:Client;

}
