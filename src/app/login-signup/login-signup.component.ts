import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';  // ToastController doesn't need to be standalone
import { ModalController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons'; // Import the icon

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [FormsModule,CommonModule,IonicModule],  // Use standalone imports for Ionic components
  providers: [ModalController],  // Add ModalController to the providers array
})
export class LoginSignupComponent {
  isLogin: boolean = true; // Toggle between login and signup
  name:any;
  password:any;
  cpassword:any;
  email:any;
  constructor(private modalController: ModalController,private http: HttpClient,private toastController: ToastController) {
    addIcons({ 'close-outline': closeOutline }); // Register the icon
  }

  // Dismiss the modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // Switch between Login and Signup views
  toggleView() {
    this.isLogin = !this.isLogin;
    this.email="";
    this.password="";
    this.name="";
  }

  onSubmit() {
    if (this.isLogin) {
      console.log('Login form submitted');
      const loginData = {
        email: this.email,
        password: this.password
      };
      this.http.post('http://localhost:8000/user/house_login/', loginData)
         .subscribe({
           next: async (response: any) => { 
            console.log(response);
            if(response.result=="error"){
              const toast = await this.toastController.create({
                message: response.message,
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
            }else{
              var data = response.data;
              localStorage.setItem('house_id',data.id);
              const toast = await this.toastController.create({
                message: response.message,
                duration: 2000,
                color: 'success'
              });
              await toast.present();
              this.dismissModal();
              this.email="";
              this.password="";
            }
           },
           error: async (err) => {
             const toast = await this.toastController.create({
               message: 'Login failed. Please try again.',
               duration: 2000,
               color: 'danger'
             });
             await toast.present();
           }
         });
    } else {
      console.log('Signup form submitted');
      const signupData = {
        email: this.email,
        password: this.password,
        username: this.name
      };
      this.http.post('http://localhost:8000/user/house_reg/', signupData)
         .subscribe({
           next: async (response: any) => { 
            console.log(response);
            if(response.result=="error"){
              const toast = await this.toastController.create({
                message: response.message,
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
            }else{
              var data = response.data;
              localStorage.setItem('house_id',data.id);
              const toast = await this.toastController.create({
                message: response.message,
                duration: 2000,
                color: 'success'
              });
              await toast.present();
              this.dismissModal();
              this.email="";
              this.password="";
              this.name="";
            }
           },
           error: async (err) => {
             const toast = await this.toastController.create({
               message: 'Signup failed. Please try again.',
               duration: 2000,
               color: 'danger'
             });
             await toast.present();
           }
         });
    }
  }
}
