import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private storageKey = 'ss_orders';
  private orders: Order[] = [];

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) { this.orders = JSON.parse(raw); }
  }

  private persist() { localStorage.setItem(this.storageKey, JSON.stringify(this.orders)); }

  placeOrder(shop: string, productId: number, productName: string, category: string, qty = 1, shopLocation?: string) {
    const existing = this.orders.find(o => o.shop === shop && o.productId === productId);
    if (existing) {
      existing.qty += qty;
      existing.shopLocation = shopLocation || existing.shopLocation;
    } else {
      this.orders.push({ shop, shopLocation, productId, productName, category, qty });
    }
    this.persist();
  }

  removeOrder(shop: string, productId: number, qty = 1) {
    const existing = this.orders.find(o => o.shop === shop && o.productId === productId);
    if (!existing) { return; }
    existing.qty -= qty;
    if (existing.qty <= 0) {
      this.orders = this.orders.filter(o => !(o.shop === shop && o.productId === productId));
    }
    this.persist();
  }

  getOrdersForWarehouse(): Order[] {
    // return a copy
    return this.orders.map(o => ({ ...o }));
  }

  getOrdersForShop(shop: string): Order[] {
    return this.orders.filter(o => o.shop === shop).map(o => ({ ...o }));
  }

  getQtyFor(shop: string, productId: number) {
    const o = this.orders.find(x => x.shop === shop && x.productId === productId);
    return o ? o.qty : 0;
  }

  hasAnyOrdersForProduct(productId: number) {
    return this.orders.some(o => o.productId === productId && o.qty > 0);
  }

  getAllOrders(): Order[] {
    return this.orders.map(o => ({ ...o }));
  }
}
