import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

/**
 * Generated class for the GmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gmap',
  templateUrl: 'gmap.html',
})
export class GmapPage {

  getDetail = {rentalroom_latitude:'',rentalroom_longitude:''};
//lat,long*******
  @ViewChild('map') mapElement: ElementRef;

  map:any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public loadingCtrl: LoadingController
    ,public geolocation: Geolocation)
    {
      this.getCurrentLocation();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GmapPage');
    this.getDetail = this.navParams.data;
    console.log(this.getDetail);
  }

  getCurrentLocation() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      // this.myLatitude = resp.coords.latitude;
      // this.myLongitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(this.getDetail.rentalroom_latitude, this.getDetail.rentalroom_longitude);
      console.log(this.getDetail.rentalroom_latitude);
      console.log(this.getDetail.rentalroom_longitude);

      // console.log(this.myLatitude);
      // console.log(this.myLongitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(this.map);
      loader.dismiss();
    });
  }

}
