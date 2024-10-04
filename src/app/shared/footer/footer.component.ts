import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone'; // Import the standalone components
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ModalController, IonicModule } from '@ionic/angular';
import { LoginSignupComponent } from '../../login-signup/login-signup.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline,logoFacebook,logoTwitter,logoInstagram,logoYoutube } from 'ionicons/icons'; // Import the icon

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [FormsModule,CommonModule,IonicModule],
  providers: [ModalController],  // Add ModalController to the providers array
})
export class FooterComponent  {

  constructor(    private router: Router  ) { 
    addIcons({ 'logo-facebook': logoFacebook,'logo-twitter':logoTwitter,'logo-instagram':logoInstagram,'logo-youtube':logoYoutube });
  }

  Redirect(path:any){
    // this.menuController.close();
    this.router.navigate(['/'+path]);
    // this.menuController.close();
  }
}
