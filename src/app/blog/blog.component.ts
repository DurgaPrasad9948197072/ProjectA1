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
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],  // Use standalone imports for Ionic components
  providers: [ModalController],
})
export class BlogComponent  implements OnInit {
  email: string = ''; // Holds the user's email input
  subscriptionSuccess: boolean = false; // Shows success message upon subscription
  categories: any[] = [
    {
      "id": 1,
      "name": "Business Templates"
    },
    {
      "id": 2,
      "name": "Creative Templates"
    }
  ]; 
  tags: string[] = [
    "Responsive",
    "SEO-friendly",
    "E-commerce",
    "Minimalist",
    "Portfolio"
  ]; 
  posts:any[]=[
    {
      "id": 1,
      "image": "/assets/images/post1.jpg",
      "title": "How to Choose the Right Template",
      "excerpt": "In this post, we'll explore how to choose the right template for your business."
    },
    {
      "id": 2,
      "image": "/assets/images/post2.jpg",
      "title": "Best Practices for Customizing Templates",
      "excerpt": "Learn the best practices for customizing templates to fit your brand."
    }
  ];


  constructor(
    private alertController: AlertController,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {}


    // Filter posts by tag
    filterByTag(tag: string): void {
      console.log(`Filtering posts by tag: ${tag}`);
      // Logic to filter posts by tag
    }

    subscribe(): void {
      if (this.email) {
        // Simulate a subscription process, e.g., API call
        this.subscriptionSuccess = true;
        console.log('Subscribed with email:', this.email);
        
        // Reset the email field
        this.email = '';
      }
    }

}
