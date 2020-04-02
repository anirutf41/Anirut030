import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
/**
 * Generated class for the DetailcatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailcat',
  templateUrl: 'detailcat.html',
})
export class DetailcatPage {
  rentalroom =[];
  DETAIL= [];
  ncontact= "";
  price:any={};
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl : AlertController) {
    this.getJsonObjet();
    this.initializeItems();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailcatPage');
    this.ncontact = this.navParams.data;
    console.log(this.ncontact);
  }

  getJsonObjet(){
    this.ncontact = this.navParams.data;
    let url = Enums.APIURL.URL+'/todoslim3/public/rentalroom/'+this.ncontact;
    this.http.get(url).subscribe(
      (data: any)=>{
       this.DETAIL = data;
       console.log(this.DETAIL);
       console.log(url);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  callover(dttest){
    this.navCtrl.push("OverviweDetailPage",dttest);
  }

  initializeItems(){
    this.DETAIL;
  };

  getItems(ev: any) {
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.DETAIL  = this.DETAIL.filter((items) => {
        return (items.rentalroom_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.getJsonObjet();
    }
  }

  cancle(){
    this.getJsonObjet();
  }

  search(){
    this.ncontact = this.navParams.data;
    let url1 = Enums.APIURL.URL+'/todoslim3/public/rentalroom/select/1/'+this.ncontact;
    let url2 = Enums.APIURL.URL+'/todoslim3/public/rentalroom/select/2/'+this.ncontact;
    let url3 = Enums.APIURL.URL+'/todoslim3/public/rentalroom/select/3/'+this.ncontact;

    console.log(this.rentalroom);
    let alert = this.alertCtrl.create();
    alert.setTitle('เลือกช่วงราคาห้องพัก');
    alert.addInput({
      type: 'checkbox',
      label: 'น้อยกว่า 3,000',
      value: '1',
    });

    alert.addInput({
      type: 'checkbox',
      label: '3,000-4,000',
      value: '2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'มากว่า 4,000',
      value: '3'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
      this.price = data;
        console.log(this.price);
        if(this.price==1){
          this.http.get(url1).subscribe(
            (data: any)=>{
              console.log(data);
             this.DETAIL = data;
             console.log(this.DETAIL);
            }
            ,
            (error) => {console.log(error)}
          );
        }else if(this.price==2){
          this.http.get(url2).subscribe(
            (data: any)=>{
              console.log(data);
             this.DETAIL = data;
             console.log(this.DETAIL);
            }
            ,
            (error) => {console.log(error)}
          );
        }else if(this.price==3){
          this.http.get(url3).subscribe(
            (data: any)=>{
              console.log(data);
             this.DETAIL = data;
             console.log(this.DETAIL);
            }
            ,
            (error) => {console.log(error)}
          );
        }
      }
    });
    alert.present();
  }

  gohome(){
    this.navCtrl.push("HomePage");
  }

}
