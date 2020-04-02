import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events , Note, Icon} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as Enums from '../../enums/enums';


/**
 * Generated class for the OverviweDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overviwe-detail',
  templateUrl: 'overviwe-detail.html',
})
export class OverviweDetailPage {
  score = "";
  returnMsg = "";
  gcomment = [];
  comment :string="";
  gettcatname = [];
  tname = "";
  tprice = "";
  tlo = "";
  tphone ="";
  getDetail = {rentalroom_name:'',rentalroom_name_location:'',rentalroom_price:'',rentalroom_phone:'',category_id:'',rentalroom_id:''};
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing
    , public event : Events) {
      this.event.subscribe('star-rating:changed', (note) => {
        console.log('คะแนน',note);
        this.score= note;
        })

        this.getJsonObjet();
        this.getcomment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviweDetailPage');
    this.getDetail = this.navParams.data;
    console.log(this.getDetail);
  }


  getJsonObjet(){
    this.getDetail = this.navParams.data;
    let url = Enums.APIURL.URL+'/todoslim3/public/category/'+this.getDetail.category_id;
    this.http.get(url).subscribe(
      (data: any)=>{
       this.gettcatname = data;
       console.log("catname",this.gettcatname);
       console.log(url);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  getcomment(){
    this.getDetail = this.navParams.data;
    let url = Enums.APIURL.URL+'/todoslim3/public/comment/'+this.getDetail.rentalroom_id;
    this.http.get(url).subscribe(
      (data: any)=>{
       this.gcomment = data;
       console.log("comment",this.gcomment);
       console.log(url);
       this.score="0";
      }
      ,
      (error) => {console.log(error)}
    );
  }


  share() {
    let  GO = ""+this.getDetail.rentalroom_name+"\nราคา : "+this.getDetail.rentalroom_price+"\n"+this.getDetail.rentalroom_name_location+
    "\nเบอร์ : "+this.getDetail.rentalroom_phone;
    console.log("GO",GO);
    this.socialSharing.share(GO).then(() => {
    }).catch(() => {
      // Error!
    });
  }

  gmap(getDetail){
    this.navCtrl.push("GmapPage",getDetail);
  }

  summit(comment){
    if(comment != null){
      if(this.score != "0"){
        //START
        let josnData;
        josnData = {
          comment_content: comment
        , comment_score: this.score
        , rentalroom_id: this.getDetail.rentalroom_id
        };

        let url = Enums.APIURL.URL+'/todoslim3/public/addcomment';

        this.http.post(url,josnData).subscribe(
        (data: any)=>{
        console.log(data);
        alert("แสดงความคิดเห็นสำเร็จ");
        this.getcomment();
        this.comment="";
        this.score="";
        }
        ,
        (error) => {console.log(error)}
         );
        //END

      }
      else{
        alert("โปรดให้คะแนน");
      }
    }
    else{
      alert("โปรดกรอกความคิดเห็น");
    }
  }



}//end
