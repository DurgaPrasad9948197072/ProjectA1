import { Routes } from '@angular/router';

// Import components for routing
import { HomePage } from './home/home.page';
import { ProductListingComponent } from './product-listing/product-listing.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage), // Lazy load HomePage
  },
  {
    path: 'products',
    loadComponent: () => import('./product-listing/product-listing.component').then((m) => m.ProductListingComponent), // Lazy load ProductListingComponent
  },
  {
    path: 'products_details',
    loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'contactus',
    loadComponent: () => import('./contactus/contactus.component').then(m => m.ContactusComponent),
  },
  {
    path: 'aboutus',
    loadComponent: () => import('./aboutus/aboutus.component').then(m => m.AboutusComponent),
  },
  {
    path: 'help-center',
    loadComponent: () => import('./help-center/help-center.component').then(m => m.HelpCenterComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home', // Redirect to home for any unknown paths
  },
];
