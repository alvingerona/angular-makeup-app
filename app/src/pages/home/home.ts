import { MakeupPage } from './../makeup/makeup';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import {BRANDS} from '../../includes/brands';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  items: Array<any>;
  brand: any;
  brands: Array<Object>;
  favorites: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public loadingCtrl: LoadingController) {
    this.brands = BRANDS;
    this.brand = BRANDS[0];
    this.favorites = [];
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    let url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=' + this.brandName;
    
    // Show loader
    this.presentLoading();

    this.http.get(url).subscribe((res: any ) => {
      this.items = res;
      this.loading.dismiss();
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loading.present();
  } 

  onChange() {
    this.loadItems();
  }

  openInfo(item) {
    this.navCtrl.push(MakeupPage, item)
  }

  addToFavorites(item) : void{
    if(!this.isFavorite(item)){
      this.favorites.push(item);
    }
  }

  removeToFavorites(item){
    this.favorites.forEach((product:any, i) => {
      if(item.name === product.name){
        this.favorites.splice(i, 1);
      }
    });
  }

  isFavorite(item): boolean{
    let found = false;
    this.favorites.forEach((product:any, i) => {
      if(item.name === product.name){
        found = true;
      }
    });

    return found;
  }

  get brandName() : string{
    let name =  (this.brand && this.brand.name ? this.brand.name : 'almay');

    return name;
  }
}
