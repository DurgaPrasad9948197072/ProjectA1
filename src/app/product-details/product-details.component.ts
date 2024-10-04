import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { AlertController ,IonicModule} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';  

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],  // Use standalone imports for Ionic components
  providers: [ModalController],  // Add ModalController to the providers array
})
export class ProductDetailsComponent {
  template: any;
  featuresData: string[] = [];
  technicalData: string[] = [];
  productId: any;

  relatedTemplates:any[] = [
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    },
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    },
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    },
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    },
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    },
    {
      name: 'Creative Portfolio Template',
      image: 'assets/images/portfolio-template.jpg',
      price: 39.99,
      link: '/template/portfolio-template',
    }
  ];

  reviews:any[] = [
    {
      reviewer: 'John Doe',
      rating: 5,
      comment: 'This template is amazing! Easy to use and very customizable.',
    },
    {
      reviewer: 'Jane Smith',
      rating: 4,
      comment: 'Great template, but it lacks some advanced features.',
    }
  ];


  constructor(
    private alertController: AlertController,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state && 'id' in navigation.extras.state) {
      this.productId = navigation.extras.state['id'];
    } else {
      console.log('No state or product ID found');
    }
    this.get_product_details();
  }
  async purchaseTemplate() {
    const alert = await this.alertController.create({
      header: 'Purchase Successful',
      message: `You have successfully purchased the ${this.template.name} for $${this.template.price}.`,
      buttons: ['OK']
    });
    await alert.present();
  }

    getRatingStars(rating: number): Array<number> {
      return Array(rating).fill(0); 
    }
  
    async get_product_details(){      
      this.http.get('http://localhost:8000/user/house_product_getdeatils/'+this.productId)
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
           this.template = response.data;
           this.featuresData = response.data.features;
           this.technicalData = response.data.technical;
         }
        },
        error: async (err:any) => {
          const toast = await this.toastController.create({
            message: 'Signup failed. Please try again.',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }

    // submitReview() {
    //   if (this.newReview.reviewer && this.newReview.rating && this.newReview.comment) {
    //     if (this.newReview.rating >= 1 && this.newReview.rating <= 5) {
    //       this.reviews.push({ ...this.newReview });
    //       this.newReview = { reviewer: '', rating: 0, comment: '' }; // Reset form
    //     } else {
    //       // Rating is out of range
    //       console.log('Please provide a rating between 1 and 5');
    //     }
    //   } else {
    //     // Handle missing fields
    //     console.log('Please fill in all fields');
    //   }
    // }

    Redirectproductscheckout(){
      this.router.navigate(['/checkout']);
    }
}
