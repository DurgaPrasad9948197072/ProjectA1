import { Component, CUSTOM_ELEMENTS_SCHEMA,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ToastController } from '@ionic/angular';  // ToastController doesn't need to be standalone
import { ModalController,IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [IonicModule, FormsModule,CommonModule,HeaderComponent,FooterComponent],
  providers: [ModalController], 
})
export class HomePage {

  isModalOpen = false;
  islogin = false;
  isLoginOpen = true;
  isRegOpen =false;
  email: string = '';
  password: string = '';
  // Define the array of featured templates
  featuredTemplates: Array<{ 
    id: number, 
    name: string, 
    image: string, 
    price: number 
  }> = [];
    // Define the array of featured categories
    featuredCategories: Array<{ 
      id: number, 
      name: string, 
      image: string 
    }> = [];
  
    testimonials: Array<{
      avatar: string,
      name: string,
      role: string,
      feedback: string
    }> = [];
  
    slideOpts = {
      initialSlide: 0,
      speed: 400,
      autoplay: {
        delay: 3000,
      },
    };

    categories = [
      {
        id: 1,
        name: 'Business',
        image: '/assets/images/business-category.jpg',
      },
      {
        id: 2,
        name: 'Portfolio',
        image: '/assets/images/portfolio-category.jpg'
      },
      {
        id: 3,
        name: 'E-commerce',
        image: '/assets/images/ecommerce-category.jpg'
      },
      {
        id: 4,
        name: 'Blog',
        image: '/assets/images/blog-category.jpg'
      },
      {
        id: 5,
        name: 'Landing Pages',
        image: '/assets/images/landing-category.jpg'
      },
      {
        id: 6,
        name: 'Agency',
        image: '/assets/images/agency-category.jpg'
      }
    ];
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Sample data for featured templates
    this.featuredTemplates = [
      {
        id: 1,
        name: 'Modern Business Template',
        image: '/assets/images/more_classic_business_template_preview.jpg',
        price: 49.99
      },
      {
        id: 2,
        name: 'Creative Portfolio Template',
        image: '/assets/images/creative_portfolio_template_preview.jpg',
        price: 29.99
      },
      {
        id: 3,
        name: 'Minimalist Blog Template',
        image: '/assets/images/minimalist_blog_template_preview.jpg',
        price: 19.99
      },
      {
        id: 4,
        name: 'E-commerce Store Template',
        image: '/assets/images/ecommerce_store_template_preview.jpg',
        price: 59.99
      },
      {
        id: 5,
        name: 'Landing Page Template',
        image: '/assets/images/landing_page_template_preview.jpg',
        price: 39.99
      },
      {
        id: 6,
        name: 'Agency Website Template',
        image: '/assets/images/agency_template_preview.jpg',
        price: 44.99
      }
    ];

        // Sample data for featured categories
        this.featuredCategories = [
          {
            id: 1,
            name: 'Business',
            image: '/assets/images/business-category.jpg'
          },
          {
            id: 2,
            name: 'Portfolio',
            image: '/assets/images/portfolio-category.jpg'
          },
          {
            id: 3,
            name: 'E-commerce',
            image: '/assets/images/ecommerce-category.jpg'
          },
          {
            id: 4,
            name: 'Blog',
            image: '/assets/images/blog-category.jpg'
          },
          {
            id: 5,
            name: 'Landing Pages',
            image: '/assets/images/landing-category.jpg'
          },
          {
            id: 6,
            name: 'Agency',
            image: '/assets/images/agency-category.jpg'
          }
        ];

            // Sample data for testimonials
    this.testimonials = [
      {
        avatar: '/assets/images/avatar1.jpg',
        name: 'John Doe',
        role: 'CEO, TechCorp',
        feedback: 'The templates from Mixed Hunt are top-notch. My website has never looked better!'
      },
      {
        avatar: '/assets/images/avatar2.jpg',
        name: 'Jane Smith',
        role: 'Freelancer',
        feedback: 'I found exactly what I needed. The customization options are amazing and easy to use!'
      },
      {
        avatar: '/assets/images/avatar3.jpg',
        name: 'Samuel Green',
        role: 'Founder, StartupHub',
        feedback: 'I love the simplicity and elegance of the templates. Highly recommended!'
      }
    ];
  }

  Openlogin() {
    this.isModalOpen = true;
  }

  subscribeNewsletter() {
    if (this.email) {
      console.log(`Subscribed with email: ${this.email}`);
      // Here you can add logic to send the email to a backend service or API.
      this.email = ''; // Clear input after submission
    } else {
      console.log('Please enter a valid email.');
    }
  }

  Login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Call your login API
    this.http.post('http://localhost:8000/house_login', loginData)
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
            localStorage.setItem('Id',data.id);
            this.isModalOpen = false;
            this.islogin = false;
            const toast = await this.toastController.create({
              message: response.message,
              duration: 2000,
              color: 'success'
            });
            await toast.present();

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
  }

  closeModal() {
    this.isModalOpen = false;
  }

  Redirectproducts(){
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products']);
    });
  }
  
  productbycategory(category:string){
    this.router.navigate(['/products'], {state: { category: category } });
  }

}
