import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
  , styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name') || '';
      this.categoryName = name;
      this.products = this.productService.getByCategory(name);
    });
  }

  canOrder() { return this.auth.isShop(); }

  orderOnce(p: Product) {
    const user = this.auth.currentUser;
    if (!user) { return; }
    this.orderService.placeOrder(user.username, p.id, p.name, p.category, 1, user.location);
  }

  cancelOrder(p: Product) {
    const user = this.auth.currentUser;
    if (!user) { return; }
    this.orderService.removeOrder(user.username, p.id, 1);
  }

  qtyOrdered(p: Product) {
    const user = this.auth.currentUser;
    if (!user) { return 0; }
    return this.orderService.getQtyFor(user.username, p.id);
  }

  isProductOrderedByAny(p: Product) {
    return this.orderService.hasAnyOrdersForProduct(p.id);
  }
}
