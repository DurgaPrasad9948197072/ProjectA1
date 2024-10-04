import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ModalController,IonicModule,MenuController } from '@ionic/angular';
import { LoginSignupComponent } from '../../login-signup/login-signup.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { cartOutline,callOutline,pricetagsOutline,starOutline,settingsOutline} from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  imports: [IonicModule, FormsModule,CommonModule],
  providers: [ModalController,MenuController], 

})
export class HeaderComponent {
  loginenable:any=null;
  constructor(
    private modalController: ModalController,
    private menuController: MenuController,
    private router: Router
  ) { 
    addIcons({ 
      'cart-outline': cartOutline,
      'call-outline' : callOutline,
      'pricetags-outline':pricetagsOutline,
      'star-outline':starOutline,
      'settings-outline':settingsOutline 
    });
    this.loginenable = localStorage.getItem("house_id");  
     // Listen to navigation events
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Close the menu on navigation
      this.menuController.close('main-menu');
    });
  }

  ngOnInit() {}
  
  async openLoginSignupModal() {
    const modal = await this.modalController.create({
      component: LoginSignupComponent,
      cssClass: 'transparent-modal',
      backdropDismiss: true,
    });
    return await modal.present();
  }

  Redirect(path:any){
    // this.menuController.close();
    this.menuController.close('main-menu');
    this.router.navigate(['/'+path]);
    // this.menuController.close();
  }
  
}
