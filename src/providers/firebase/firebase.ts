import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class FirebaseProvider {

  constructor() {
    console.log('Hello FirebaseProvider Provider');
  }

  login(email,password)
  {
    return new Promise((resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(resp_user=>{
        resolve(resp_user);
      },err=>{
        reject(err);
      })
    })
  }

  logout()
  {
    firebase.auth().signOut();
  }

  checkStatus()
  {
    return new Promise((resolve,reject)=>{
      firebase.auth().onAuthStateChanged(res_user=>{
        if(res_user)
        {
          resolve(res_user);
        }
        reject(0);
      },err=>{
        reject(err);
      })
    })
  }

  create(uid,item)
  {
    return new Promise((resolve,reject)=>{

      var post_key=firebase.database().ref().child('abcabc').push().key;

      firebase.database().ref("todo/"+uid+"/"+post_key+"/")
      .set(item)
      .then(response_success=>{
        resolve(response_success); //If it succeeds
      },err=>{
        reject(err); //If it fails
      })

    })
  }

  read(uid)
  {
    return new Promise((resolve,reject)=>{

      firebase.database().ref("todo/"+uid)
      .once('value')
      .then(resp_db=>{
        let return_data= [];

        resp_db.forEach(data=>{

          return_data.push({
            post_key:data.key,
            value:data.val()
          });

        })

        resolve(return_data);

      },err=>{
        reject(err);
      })


    })
  }

  update(uid,post_key,item)
  {
    return new Promise((resolve,reject)=>{
      firebase.database().ref('todo/'+uid+'/'+post_key+'/')
      .update(item)
      .then(resp_update=>{
        resolve(resp_update); //if success
      },err=>{
        reject(err); //if fail
      })

    })
  }

  deletex(uid,post_key)
  {
    return new Promise((resolve,reject)=>{

      firebase.database().ref('todo/'+uid+'/'+post_key+'/')
      .remove()
      .then(resp_delete=>{
        resolve(resp_delete); //if success
      },err=>{
        reject(err); //if fail
      })

    })
  }

  addUser(email,password)
  {
    return new Promise((resolve,reject)=>{

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(resp_newuser=>{
        resolve(resp_newuser);
      },err=>{
        reject(err);
      })

    })
  }

  forgotPassword(email)
  {
    return new Promise((resolve,reject)=>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(resp_success=>{
            console.log("SUCCESS!")
            resolve("OK");
        },err=>{
            console.log("PROBLEM",err);
            reject(err);
        })
    })
  }



}
