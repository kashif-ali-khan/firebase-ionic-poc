import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  signup(email: string, password: string,displayName:string,imageBase64?:string) {
    return Observable.create(observer=>{

   
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(signUpData => {
        console.log('Success!', signUpData);
        observer.next(signUpData)

        
        this.firebaseAuth.authState.subscribe(authstate=>{
          let userObject = {
            displayName:displayName,
            photoURL:imageBase64
          }
          authstate.updateProfile(userObject);
        })
      })
      .catch(error => {
        console.log('Something went wrong:',error.message);
        observer.error(error);
      })
    });    
  }

  login(email: string, password: string) {
    return Observable.create(observer => {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(authData => {
        console.log('Nice, it worked!');
        observer.next(authData);
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  logout() {
    return Observable.create(observer=>{
      this.firebaseAuth
      .auth
      .signOut().then(()=>{
          observer.next(true)
      });
    });
  }

  getUserData(){
    return this.firebaseAuth.authState;
  }

}
