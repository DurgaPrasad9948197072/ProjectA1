import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ModalController,IonicModule,MenuController } from '@ionic/angular';
import { LoginSignupComponent } from '../../login-signup/login-signup.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { cartOutline,callOutline,pricetagsOutline,starOutline,settingsOutline,menuOutline} from 'ionicons/icons';

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
      'settings-outline':settingsOutline,
      'menu-outline':menuOutline 
    });
    this.loginenable = localStorage.getItem("house_id");  

  }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
       this.closeMenu();
    });
  }
  
  async openLoginSignupModal() {
    const modal = await this.modalController.create({
      component: LoginSignupComponent,
      cssClass: 'transparent-modal',
      backdropDismiss: true,
    });
    return await modal.present();
  }



  async Redirect(page: string) {
    await this.closeMenu();
    this.router.navigate(['/'+page]);
  }

   openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open();
      console.log("menu");
    }
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      console.log("menu");
      menu.close();
    }
  }
  
}
