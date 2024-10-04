import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ModalController, AlertController,IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],  // Use standalone imports for Ionic components
  providers: [ModalController],  // Add ModalController to the providers array
})
export class CheckoutComponent {
  cartItems = [
    { name: 'Android', price: 19.99, quantity: 1, image: 'assets/template1.jpg',selected: true },
    { name: 'iOS', price: 29.99, quantity: 1, image: 'assets/template2.jpg',selected: true },
    { name: 'Website', price: 29.99, quantity: 1, image: 'assets/template2.jpg',selected: true },
  ]; // Sample cart items

  totalCost: number = 59.99; // Example total cost
  selectedPaymentMethod: string = 'credit-card'; // Default payment method
  createAccount: boolean = false; // Toggle for account creation

  constructor(private alertController: AlertController) {
    this.calculateTotalCost();
  }

  // Calculate total cost of items in the cart
  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Remove an item from the cart
  removeItem(item:any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.calculateTotalCost(); // Recalculate total cost
  }

  // Proceed to checkout
  async proceedToCheckout() {
    if (this.cartItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Your cart is empty.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Checkout Successful',
      message: `Your total payment is ${this.totalCost}.`,
      buttons: ['OK'],
    });

    await alert.present();
  }
  onCreateAccountChange(event: any) {
    this.createAccount = event.detail.checked; // This will be true or false based on the checkbox state
    console.log('Create Account:', this.createAccount); // For debugging purposes
  }

}
