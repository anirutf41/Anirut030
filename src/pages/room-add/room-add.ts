import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums'; 
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-room-add',
  templateUrl: 'room-add.html',
})
export class RoomAddPage {
  base64Image : string;
  room = {
    rentalroom_name: '', rentalroom_price: '', category_id: '', rentalroom_limitedroom_sex: '',
    rentalroom_phone: '', rentalroom_name_location: '', rentalroom_facilities: ''
  };
  type = [];
  name :string="";
  price :string="";
  cattegory :string="";
  sex :string="";
  phone :string="";
  location :string="";
  day :string="";

  myLatitude = 0;
  myLongitude = 0;
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public geolocation: Geolocation
    , private loadingCtrl:LoadingController) {
    this.category();
    this.rentalroom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomAddPage');
  }

  openGallery(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
     this.base64Image = 'data:image/jpeg;base64,' +imageData;
    }, (error) => {
       console.log(error)
    });
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.myLatitude = resp.coords.latitude;
      this.myLongitude = resp.coords.longitude;
      });
  }

  rentalroom() {
    let url = Enums.APIURL.URL + '/todoslim3/public/rentalrooms';
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);
        this.room = data;
        console.log(this.room);
      }
      ,
      (error) => { console.log(error) }
    );
  }

  category() {
    let url = Enums.APIURL.URL + '/todoslim3/public/categorys';
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);
        this.type = data;
        console.log(this.type);
      }
      ,
      (error) => { console.log(error) }
    );

  }

  ok (name,price,category,sex,phone,location,day) {
    if (name != null && price != null && category != null&& sex != null&& phone != null&& location != null&& day != null) {
     let josnData;
     josnData = {
       rentalroom_name : name ,
       rentalroom_price:price,
       category_id : category,
       rentalroom_limitedroom_sex:sex,
       rentalroom_phone:phone,
       rentalroom_name_location:location,
       rentalroom_facilities:day,
       rentalroom_latitude :this.myLatitude,
       rentalroom_longitude :this.myLongitude,
       //rentalroom_img : this.base64Image

     };
     let url = Enums.APIURL.URL + '/todoslim3/public/addroom';
     this.http.post(url, josnData).subscribe(
       (data: any) => {
         console.log(data);

         alert("เพิ่มข้อมูลเรียบร้อย");
         this.name = "";
         this.price = "";
         this.cattegory = "";
         this.sex = "";
         this.phone = "";
         this.location = "";
         this.day = "";
         this.myLatitude = 0;
         this.myLongitude = 0;
       }
       ,
       (error) => { console.log(error) }
     );
    }
    else{
      alert("โปรดกรอกให้ครบทุกช่อง");
    }

  // save(){
  //   let loader = this.loadingCtrl.create({
  //     content: "Uploading..."
  //   });

  //   //file transfer action
  //   let josnData = { base64Image:this.base64Image };
  //   let url = Enums.APIURL.URL +'/api/upload/uploadFoto.php';





 //}

}
}




