import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  items: Array<any>;
  brand: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public loadingCtrl: LoadingController) {
    this.brand = 'maybelline';
  }

  ionViewDidLoad() {
    this.loadBeers();
  }

  loadBeers() {
    console.log(this.brand);
    let url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=' + this.brand;
    
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
    this.loadBeers();
  }

  openInfo(item) {

  }
}
