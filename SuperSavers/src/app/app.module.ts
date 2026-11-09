import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ProductService } from './services/product.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStaffComponent } from './admin/admin-staff.component';
import { AdminOrdersComponent } from './admin/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'orders/:shop/:category', component: OrdersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    LoginComponent,
    OrdersComponent,
    ScannerComponent,
    AdminComponent,
    AdminStaffComponent,
    AdminOrdersComponent,
    AdminProductsComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [ProductService, AuthService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
