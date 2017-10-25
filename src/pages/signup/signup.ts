import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading,ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { SongsPage } from '../songs/songs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  loading: Loading;
  signinForm: FormGroup;
  base64Image:any;
  imageBase64:any;

  error: any;

  constructor(public camera:Camera,private toast:ToastController,public authService: AuthProvider,public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,private fb: FormBuilder) {
   
  }

  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.imageBase64 = imageData;
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       console.log(err);
     });
   }

  ngOnInit() {
    this.signinForm = this.fb.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'displayName':['',Validators.compose([Validators.minLength(4)])]
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup(): void { 
    if(this.signinForm.valid) {
   let email = this.signinForm.controls['email'];     
  let password = this.signinForm.controls['password'];   
  let displayName = this.signinForm.controls['displayName'];   
      this.showLoading();
      this.authService.signup(email.value,password.value,displayName.value,this.imageBase64).subscribe(data=>{
        console.log(data)
        this.loading.dismiss();
        this.navCtrl.push(SongsPage);
      },registerError=>{
        if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
        {
         this.toast.create()
        }
      });
    }
}

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
