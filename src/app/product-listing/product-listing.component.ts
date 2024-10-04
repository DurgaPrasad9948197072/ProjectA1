import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';  
// import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone'; // Import the standalone components
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { gridOutline, listOutline} from 'ionicons/icons'; 
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add CUSTOM_ELEMENTS_SCHEMA here
  imports: [IonicModule,FormsModule,CommonModule,HeaderComponent,FooterComponent],  // Use standalone imports for Ionic components
  providers: [ModalController],  // Add ModalController to the providers array
})
export class ProductListingComponent  implements OnInit {
  searchQuery:any;
  categories: string[] = ['All', 'Business', 'Portfolio', 'E-commerce', 'Blog', 'Landing Pages', 'Agency'];
  selectedCategory: string = 'All';
  currentView: string = 'grid'; // View mode: 'grid' or 'list'
  templates: Array<{ id: number, name: string, image: string, price: number, category: string }> = [];
  filteredTemplates: Array<{ id: number, name: string, image: string, price: number, category: string }> = [];
  categorynav:any;
  constructor(    
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    addIcons({ 'grid-outline': gridOutline,'list-outline':listOutline });
    this.get_product_list();
  }

  ngOnInit() {
    this.initilization();
  }

  async initilization(){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state && 'category' in navigation.extras.state) {
      this.categorynav = navigation.extras.state['category'];
    } else {
      this.categorynav = 'All'
    }
  }

  async get_product_list(){
    this.http.get('http://localhost:8000/user/house_product_list/')
    .subscribe({
      next: async (response: any) => { 
       if(response.result=="error"){
         const toast = await this.toastController.create({
           message: response.message,
           duration: 2000,
           color: 'danger'
         });
         await toast.present();
       }else{
         var data = response.data;
         this.templates = data;
         this.filteredTemplates = this.templates;
         await this.selectCategory(this.categorynav);
       }
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Signup failed. Please try again.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  // Filter templates by category
  selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredTemplates = this.templates;
    } else {
      this.filteredTemplates = this.templates.filter(template => template.category === category);
    }
  }

  filterTemplates() {
    // Convert search query to lowercase for case-insensitive comparison
    const searchQueryLower = this.searchQuery.toLowerCase();
  
    // Filter templates by search query matching the template name
    this.filteredTemplates = this.templates.filter(template =>
      template.name.toLowerCase().includes(searchQueryLower)
    );
  }

  // Toggle between grid and list view
  toggleView(view: string) {
    this.currentView = view;
  }



  RedirectproductDetails(id:number){
    this.router.navigate(['/products_details'], {state: { id: id } });
  }
}
