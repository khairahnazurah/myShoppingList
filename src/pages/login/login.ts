import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController,AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {FirebaseProvider} from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:any;
  pass:any;
  constructor(
    public alertCtrl:AlertController,
    public mc:ModalController,
    public loading:LoadingController,
    public fbp:FirebaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  login()
  {
    let load=this.loading.create({content: "Please wait..."});
    load.present();

    this.fbp.login(this.email,this.pass)
    .then(resp_login=>{
      console.log("OK",resp_login);
      load.dismiss();
      this.navCtrl.setRoot(HomePage);

    },err=>{
      console.log("ERROR",err);
      alert("Login not successful!");
      load.dismiss();
    })
  }

  createUser()
  {
    let def=this.mc.create('NewUserPage');
    def.onDidDismiss(_=>{
      this.ionViewDidLoad();
    })
    def.present();
  }

  ionViewDidLoad() {
    let load=this.loading.create({content: "Please wait..."});
    load.present();

    console.log('ionViewDidLoad LoginPage');
    this.fbp.checkStatus()
    .then(result_user=>{
      this.navCtrl.setRoot(HomePage);
      load.dismiss();
    },err=>{
      load.dismiss();
      //Nothing happens
    });
  }

  forgotPassword()
  {
    const confirm = this.alertCtrl.create({
      title: 'Reset Password for '+this.email+"??",
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            console.log('Agree clicked');
            this.fbp.forgotPassword(this.email)
            .then(resp=>{
              alert("Reset password email has been sent to "+this.email);
            },err=>{
              alert("ERROR updating email"+err);
            })
          }
        }
      ]
    });
    confirm.present();
  }

}
