import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ToastController } from '@ionic/angular';  // ToastController doesn't need to be standalone
import { ModalController,IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],
  providers: [ModalController],
})
export class SettingsComponent  {
  selectedSection: string = 'account'; // Default section to show

  constructor() {}

  // Method to switch between settings sections
  selectSection(section: string) {
    this.selectedSection = section;
  }

  // Method to check if the current section is active
  isSectionActive(section: string): boolean {
    return this.selectedSection === section;
  }

}
