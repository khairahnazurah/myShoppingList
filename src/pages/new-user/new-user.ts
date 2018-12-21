import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {
  email:any;
  password1:any;
  password2:any;

  constructor(
    public vc:ViewController,
    public fbp:FirebaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
  }

  close()
  {
    this.vc.dismiss();
  }

  createUser()
  {
    if(this.password1==this.password2)
    {
      this.fbp.addUser(this.email,this.password1)
      .then(resp_adduser=>{
        console.log("SUCCESS!");
        this.close();
      },err=>{
        console.log("ERROR",err);
        alert(err);
        this.close();
      })
    }
    else
    {
      alert("Passwords unmatched and cannot be left blank")
    }

  }

}
