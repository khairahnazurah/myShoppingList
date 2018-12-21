import { Component } from '@angular/core';
import { NavController,ModalController,LoadingController } from 'ionic-angular';

import {FirebaseProvider} from '../../providers/firebase/firebase';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid:any;
  todo_list:any=[];

  constructor(public mc:ModalController,
    public lc:LoadingController,
    public navCtrl: NavController,
    public fbp:FirebaseProvider) {

  }

  ionViewDidLoad()
  {
    let load=this.lc.create({content:"Tunggu..."});
    load.present();
    this.fbp.checkStatus()
    .then((resp_user:any={})=>{
      this.uid=resp_user.uid;
      this.getTodoList();
      load.dismiss();
    },err=>{
      load.dismiss();
      this.navCtrl.setRoot(LoginPage);
    });

  }

  getTodoList()
  {
    this.fbp.read(this.uid)
    .then((resp:any=[])=>{
      this.todo_list=resp;
      console.log(this.todo_list);
    },err=>{
      console.log("ERROR LOADING LIST",err);
    })
  }


  addTask()
  {
    let abc=this.mc.create('AddTaskPage',{mode:"add"});
    abc.onDidDismiss(_=>{
      this.ionViewDidLoad();
    })
    abc.present();
  }

  deleteButton(postkey)
  {
    this.fbp.deletex(this.uid,postkey)
    .then(res_delete=>{
      console.log("OK COOL, deleted");
      this.ionViewDidLoad();
    },err=>{
      console.log("ERROR! not deleted");
      this.ionViewDidLoad();
    })
  }

  logout()
  {
    this.fbp.logout();
    this.navCtrl.setRoot(LoginPage);
  }


  editTask(postkey,task)
  {
    let editModal=this.mc.create('AddTaskPage',{mode:"edit",post_key:postkey,task:task})
    editModal.onDidDismiss(_=>{
      this.ionViewDidLoad();
    })
    editModal.present();
  }



}
