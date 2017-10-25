import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { SongsPage } from '../songs/songs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loading: Loading;
  loginForm: FormGroup;
  // email: AbstractControl;
  // password: AbstractControl;
  error: any;

  constructor(public authService: AuthProvider,public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,private fb: FormBuilder) {
 

  //this.email = this.loginForm.controls['email'];     
  //this.password = this.loginForm.controls['password'];     
  }
  ngOnInit() {
    this.loginForm = this.fb.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
  });

  // this.loginForm = new FormGroup({
   
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern("[^ @]*@[^ @]*")
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8)
  //   ])
  // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void { 
    if(this.loginForm.valid) {
   let email = this.loginForm.controls['email'];     
  let password = this.loginForm.controls['password'];   
      this.showLoading();
      this.authService.login(email.value,password.value).subscribe(data=>{
        console.log(data)
        this.navCtrl.push(SongsPage);
        this.loading.dismiss();
      });
    }
}
createAccount(){
  this.navCtrl.push(SignupPage);
}

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
