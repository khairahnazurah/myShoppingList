import { Injectable } from '@angular/core';

/*
  Generated class for the CalculateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalculateProvider {

  constructor() {
    console.log('Hello CalculateProvider Provider');
  }

  multiplication(numA, numB){

  let numC = Number(numA) * Number(numB);
  return numC

}

}
