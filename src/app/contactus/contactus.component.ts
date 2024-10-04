import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ModalController,IonicModule,MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logoFacebook, logoTwitter, logoInstagram, logoLinkedin } from 'ionicons/icons';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],
  providers: [ModalController,MenuController], 
})
export class ContactusComponent {

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  formSubmitted: boolean = false;

  constructor() {
    addIcons({
      'logo-facebook': logoFacebook,
      'logo-twitter': logoTwitter,
      'logo-instagram': logoInstagram,
      'logo-linkedin': logoLinkedin
    });
  }

  ngOnInit() {}

  // Handle form submission
  submitContactForm(): void {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      // Simulate sending data to backend or service
      console.log('Form submitted:', this.contactForm);

      // Show success message
      this.formSubmitted = true;

      // Reset form
      this.contactForm = {
        name: '',
        email: '',
        message: ''
      };
    }
  }


}
