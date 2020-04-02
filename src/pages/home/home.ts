import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as Enums from '../../enums/enums';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryarr = [];
  ncontact:any;
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.getJsonObjet();
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.ncontact = this.navParams.data;
    console.log(this.ncontact);
  }

  initializeItems(){
    this.categoryarr;
  };

  getJsonObjet(){
    let url = Enums.APIURL.URL+'/todoslim3/public/categorys';

    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.categoryarr = data;
       console.log(this.categoryarr);
      }
      ,
      (error) => {console.log(error)}
    );

  }

  DT(cat){
    this.navCtrl.push("DetailcatPage",cat.category_id);
    (cat: any)=>{
    console.log(cat);
  }
  }

}
