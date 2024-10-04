import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ModalController,IonicModule,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],
  providers: [ModalController,MenuController],
})
export class HelpCenterComponent {
  faqs = [
    { question: 'How do I reset my password?', answer: 'To reset your password, go to the login page and click on "Forgot Password".' },
    { question: 'How can I contact customer support?', answer: 'You can contact customer support through the Contact Us page or by emailing support@example.com.' },
    { question: 'Where can I find product documentation?', answer: 'Product documentation is available in the Resources section of the Help Center.' }
  ];
  constructor() { }

  ngOnInit() {}

}
