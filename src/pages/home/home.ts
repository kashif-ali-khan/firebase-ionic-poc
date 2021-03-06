import { Component } from '@angular/core';
import { NavController, AlertController,ActionSheetController, ToastController } from 'ionic-angular';
//import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase,AngularFireList  } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: AngularFireList<any>;
  songlist:any;
  constructor(public authService: AuthProvider,private toastCtrl: ToastController,public navCtrl: NavController,af: AngularFireDatabase ,private alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController) {
     this.songs = af.list('/songs');
     this.songs.snapshotChanges().map(action=>{
       let data = new Array();
      action.forEach(item=>{
        let newObj = {
          key:item.key,
          data:item.payload.val()
        }
       
        data.push(newObj);
          
      })
      return data;
     }).subscribe(res=>{
     // console.log(res);
        


       this.songlist = res;
       //console.log(this.songlist);

     },error=>{
       this.presentToast(error.message);
       console.log(error)
     });
     
     //.subscribe(res=>this.songs = res;);
    //console.log(this.songs)

  }

  presentToast(message:string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'moviename',
          placeholder: 'Movie Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let objin = {
              title: data.title,
              timestamp: new Date().getTime(),
              moviename:data.moviename
             }
            this.songs.push(objin );
            console.log(objin)

            // this.songs.push(null).then((ref)=>{
            //  ref.push( {
            //   title: data.title
            // })

            // });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    console.log(songId);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(songId: string){
    this.songs.remove(songId);
  }

  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
