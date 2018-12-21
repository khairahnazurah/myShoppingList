import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { CalculateProvider } from '../providers/calculate/calculate';

var config = {
  apiKey: "AIzaSyDaD0G_Xl2w4_-M6wzhDO2AzWDxQboqz-w",
  authDomain: "myshoppinglist-4b391.firebaseapp.com",
  databaseURL: "https://myshoppinglist-4b391.firebaseio.com",
  projectId: "myshoppinglist-4b391",
  storageBucket: "myshoppinglist-4b391.appspot.com",
  messagingSenderId: "322487472971"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage, LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    CalculateProvider
  ]
})
export class AppModule {}
