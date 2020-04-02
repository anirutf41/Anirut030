import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Enums from '../../enums/enums';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-cat-compare',
  templateUrl: 'cat-compare.html',
})
export class CatComparePage {
  result:any={};
  value;
  cate = {rentalroom_id:''};
  comement = [];
  showroom1:any=[];
  showroom2:any=[];
  get={rentalroom_name:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    this.result.room1 ="";
    this.result.room2 ="";
    this.getJsonObjet();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CatComparePage');
    let url =Enums.APIURL.URL+'/todoslim3/public/compare';
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.value = data;
       console.log(this.value);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  getJsonObjet(){
    this.cate = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/comment/'+this.cate.rentalroom_id;
    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.comement = data;
       console.log(this.comement);
      }
      ,
      (error) => {console.log(error)}
    );
  }


  getRoomview(){
    if(this.result.room1 != ""){
      let url =Enums.APIURL.URL+'/todoslim3/public/compare/'+this.result.room1;
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.showroom1 = data;
       console.log(this.showroom1);
      }
      ,
      (error) => {console.log(error)}
    );
    }
    if(this.result.room2 != ""){
      let url =Enums.APIURL.URL+'/todoslim3/public/compare/'+this.result.room2;
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.showroom2 = data;
       console.log(this.showroom2);
      }
      ,
      (error) => {console.log(error)}
    );

    }

  }


}
