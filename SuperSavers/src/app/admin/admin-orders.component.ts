import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  allOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.allOrders = this.orderService.getAllOrders();
  }

  getTotalOrderCount(): number {
    return this.allOrders.length;
  }

  getTotalQuantity(): number {
    return this.allOrders.reduce((sum, o) => sum + o.qty, 0);
  }

  getOrdersByShop(shop: string): Order[] {
    return this.allOrders.filter(o => o.shop === shop);
  }

  getUniqueShops(): string[] {
    return Array.from(new Set(this.allOrders.map(o => o.shop))).sort();
  }
}
