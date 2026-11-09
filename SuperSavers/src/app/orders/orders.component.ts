import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

interface ShopOrderGroup {
  shopLocation: string;
  orders: Order[];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  shopGroups: ShopOrderGroup[] = [];
  selectedShop = '';
  selectedCategory = '';
  selectedOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrdersForWarehouse().map(order => ({
      ...order,
      shopLocation: order.shopLocation || this.authService.getShopLocation(order.shop) || order.shop
    }));
    const groups = new Map<string, Order[]>();
    this.orders.forEach(order => {
      const shopLocation = order.shopLocation as string;
      const shopOrders = groups.get(shopLocation) || [];
      shopOrders.push(order);
      groups.set(shopLocation, shopOrders);
    });
    this.shopGroups = Array.from(groups, ([shopLocation, orders]) => ({ shopLocation, orders }))
      .sort((a, b) => a.shopLocation.localeCompare(b.shopLocation));

    this.route.paramMap.subscribe(params => {
      this.selectedShop = params.get('shop') || '';
      this.selectedCategory = params.get('category') || '';
      this.selectedOrders = this.orders.filter(order =>
        order.shopLocation === this.selectedShop && order.category === this.selectedCategory
      );
    });
  }

  getCategories(group: ShopOrderGroup): string[] {
    return Array.from(new Set(group.orders.map(order => order.category))).sort();
  }

  getCategoryQuantity(group: ShopOrderGroup, category: string): number {
    return group.orders
      .filter(order => order.category === category)
      .reduce((total, order) => total + order.qty, 0);
  }
}
