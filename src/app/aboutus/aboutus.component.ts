import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ModalController,IonicModule,MenuController } from '@ionic/angular';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],
  providers: [ModalController,MenuController], 
})
export class AboutusComponent  {
  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO',
      bio: 'John is the visionary behind our company, leading with passion and experience.',
      photo: '/assets/team/john.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Jane oversees all technical aspects of the company, ensuring our products are cutting-edge.',
      photo: '/assets/team/jane.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Designer',
      bio: 'Mike brings creativity and innovation to our design team, shaping our brand and products.',
      photo: '/assets/team/mike.jpg'
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Manager',
      bio: 'Emily crafts our marketing strategies to connect with our customers and build our brand.',
      photo: '/assets/team/emily.jpg'
    }
  ];
  visionStatement = `We aim to be a leader in innovation and provide cutting-edge solutions that transform businesses worldwide. 
  Our vision is to create a future where technology enhances the lives of people globally.`;

  missionStatement = `Our mission is to deliver high-quality products and services that empower businesses to reach their full potential. 
  We strive to exceed customer expectations through dedication, expertise, and innovation.`;

  testimonials = [
    {
      message: 'This company transformed the way we do business, and we couldn’t be happier!',
      author: 'John Doe',
      company: 'Doe Industries'
    },
    {
      message: 'Top-notch service and an exceptional product. Highly recommend!',
      author: 'Jane Smith',
      company: 'Smith Tech Solutions'
    },
    {
      message: 'The team was professional, prompt, and always available to help us achieve our goals.',
      author: 'Mike Johnson',
      company: 'InnovateX'
    }
  ];

  clients = [
    { name: 'Client 1', logo: '/assets/clients/client1.png' },
    { name: 'Client 2', logo: '/assets/clients/client2.png' },
    { name: 'Client 3', logo: '/assets/clients/client3.png' },
    { name: 'Client 4', logo: '/assets/clients/client4.png' }
  ];
  
  constructor() { }

  ngOnInit() {}

}
