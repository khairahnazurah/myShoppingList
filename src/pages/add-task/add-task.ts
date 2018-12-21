import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {CalculateProvider} from '../../providers/calculate/calculate';


@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

  task:any;
  uid:any;
  mode:any;
  post_key:any;
  //urgency:any;
  quantity:any;
  price:any;


  constructor(
    public cp:CalculateProvider,
    public lc:LoadingController,
    public vc:ViewController,
    public fbp:FirebaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mode=this.navParams.get("mode");
    this.post_key=this.navParams.get("post_key");
    let task=this.navParams.get("task");

    if(this.mode=='edit')
    {
      this.task=task;
    }

    this.fbp.checkStatus()
    .then((user_data:any=[])=>{
      this.uid=user_data.uid;
    },err=>{
      console.log(err)
    })
  }

  addTaskToFirebase()
  {  let x=new Date();
    let timeStamp=x.getTime(); //to get epoch timestamp

    let pack_data={
      task:this.task,
      timestamp:timeStamp,
      //urgentLevel: this.urgency,
      quantity: this.quantity,
      price:this.price,
    }

    if(this.mode=="add")
    {
      this.fbp.create(this.uid,pack_data)
      .then(resp_success=>{
        console.log("SUCCESS!");
        // loader.dismiss();
        this.close();
      },err=>{
        console.log("ERROR",err);
        // loader.dismiss();
        this.close();
      })
    }
    else if(this.mode=="edit")
    {
      this.fbp.update(this.uid,this.post_key,pack_data)
      .then(res_update=>{
        console.log("SUCCESS! Update");
        //loader.dismiss();
        this.close();
      },err=>{
        console.log("ERROR",err);
      //  loader.dismiss();
        this.close();
      })
    }


  }

  close()
  {
    this.vc.dismiss();
  }





}
